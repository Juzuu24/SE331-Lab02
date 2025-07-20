<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types'

// Define props to receive event object
const props = defineProps<{
  event: Event
  id: String
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
</script>

<template>
  <p>Edit event here</p>
</template>
