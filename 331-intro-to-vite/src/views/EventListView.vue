<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EventCard from '@/components/EventCard.vue'
import CategoryOrganizerCard from '@/components/CategoryOrganizerCard.vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'

const route = useRoute()
const router = useRouter()

const page = computed(() => parseInt(route.query.page as string) || 1)
const pageSize = 3

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize)
  return page.value < totalPages
})

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
  <h1 class="text-2xl font-bold text-center my-4">Events for Good</h1>

  <div class="flex flex-col items-center gap-4">
    <EventCard
      v-for="event in events"
      :key="event.id + '-event'"
      :event="event"
    />

    <!-- ✅ Tailwindized pagination styling -->
    <div class="flex w-[290px] mt-[15px] text-gray-700 text-sm font-medium">
      <RouterLink
        id="page-prev"
        class="flex-1 text-left no-underline"
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page !== 1"
      >
        &#60; Prev Page
      </RouterLink>

      <RouterLink
        id="page-next"
        class="flex-1 text-right no-underline"
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </div>

  <h2 class="text-xl font-semibold mt-8 mb-2">Categories & Organizers</h2>
  <CategoryOrganizerCard
    v-for="event in events"
    :key="event.id + '-category-organizer'"
    :event="event"
  />
</template>
