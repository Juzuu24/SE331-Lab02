<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryOrganizerCard from '@/components/CategoryOrganizerCard.vue' // Import the new component
import type { Event } from '@/types'
import { ref,onMounted } from 'vue'
import EventService from '@/services/EventService'

const events=ref<Event[]>(null)
onMounted(() => {
  EventService.getEvents()
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})

</script>

<template>
  <h1>Events for Good</h1>
    <!--new element-->
  <div class="events">
    <EventCard v-for="event in events" :key="event.id + '-event'" :event="event" />

    <h2>Categories & Organizers</h2>
    <CategoryOrganizerCard
      v-for="event in events"
      :key="event.id + '-category-organizer'"
      :event="event"
    />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>