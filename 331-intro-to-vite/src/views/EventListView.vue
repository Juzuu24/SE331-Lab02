<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryOrganizerCard from '@/components/CategoryOrganizerCard.vue'
import { type Event } from '@/types'
import { ref, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'

// Props
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

const page = computed(() => props.page)
const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

// Computed: check if more pages exist
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return page.value < totalPages
})

// Load data when page changes
watchEffect(() => {
  events.value = null
  EventService.getEvents(2, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = parseInt(response.headers['x-total-count'] || '0')
    })
    .catch((error) => {
      console.error('There was an error!', error)
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
