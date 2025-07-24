<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EventCard from '@/components/EventCard.vue';
import CategoryOrganizerCard from '@/components/CategoryOrganizerCard.vue';
import { type Event } from '@/types';
import EventService from '@/services/EventService';

// Routing & Pagination
const route = useRoute();
const router = useRouter();

// Page and Page Size from query
const page = computed(() => parseInt(route.query.page as string) || 1);
const pageSize = computed(() => parseInt(route.query.pageSize as string) || 2);

// Event state
const events = ref<Event[] | null>(null);
const totalEvents = ref(0);

// Calculate total pages
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize.value);
  return page.value < totalPages;
});

// Fetch events on page or size change
onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(pageSize.value, page.value)
      .then((response) => {
        events.value = response.data;
        totalEvents.value = parseInt(response.headers['x-total-count'] || '0');
      })
      .catch(() => {
        router.push({ name: 'network-error-view' });
      });
  });
});

// Handle dropdown change
function updatePageSize(event: Event) {
  const newSize = (event.target as HTMLSelectElement).value;
  router.push({
    name: 'event-list-view',
    query: { page: 1, pageSize: newSize }
  });
}
</script>

<template>
  <h1>Events for Good</h1>

  <!-- Page Size Dropdown -->
  <div class="page-size">
    <label for="size">Events per page:</label>
    <select id="size" @change="updatePageSize" :value="pageSize">
      <option value="2">2</option>
      <option value="5">5</option>
      <option value="10">10</option>
    </select>
  </div>

  <div class="events">
    <EventCard
      v-for="event in events"
      :key="event.id + '-event'"
      :event="event"
    />

    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, pageSize } }"
        rel="prev"
        v-if="page !== 1"
      >
        &#60; Prev Page
      </RouterLink>

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, pageSize } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </div>

  <h2>Categories & Organizers</h2>
  <CategoryOrganizerCard
    v-for="event in events"
    :key="event.id + '-category-organizer'"
    :event="event"
  />
</template>

<style scoped>
.page-size {
  margin-bottom: 20px;
}

.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
  margin-top: 15px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
