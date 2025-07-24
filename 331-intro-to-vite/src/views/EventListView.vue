<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EventCard from '@/components/EventCard.vue'
import CategoryOrganizerCard from '@/components/CategoryOrganizerCard.vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'

// Routing & Pagination
const route = useRoute()
const router = useRouter()

// Page from query (default = 1)
const page = computed(() => parseInt(route.query.page as string) || 1)

// ✅ Fixed page size
const pageSize = 3

// State
const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

// Pagination logic
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize)
  return page.value < totalPages
})

// Fetch events when page changes
onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(pageSize, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = parseInt(response.headers['x-total-count'] || '0')
      })
      .catch(() => {
        router.push({ name: 'network-error-view' })
      })
  })
})
</script>

<template>
  <h1>Events for Good</h1>

  <div class="events">
    <EventCard
      v-for="event in events"
      :key="event.id + '-event'"
      :event="event"
    />

    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page !== 1"
      >
        &#60; Prev Page
      </RouterLink>

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
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
