<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)

const router = useRouter()

const register = () => {
  // Simulate registration logic
  // e.g., await EventService.register(event.value.id)

  // After successful registration, redirect to the event detail view
  router.push({ name: 'event-detail-view', params: { id: event.value.id } })
}
</script>

<template>
  <p>Register event here</p>
  <button @click="register">Register</button>
</template>
