<script setup lang="ts">
import type { Event } from '@/types'; // Assuming you have this interface

defineProps<{
  event: Event; // Receive the whole event object
}>();
</script>

<template>
  <div class="category-organizer-card">
    <p class="category-text">{{ event.category }}</p>
    <p class="organizer-text">{{ event.organizer }}</p>
  </div>
</template>

<style scoped>
.category-organizer-card {
  padding: 10px;
  border: 1px solid #ccc; /* Example border */
  margin-bottom: 8px; /* Example margin */
  width: 250px; /* Match EventCard width if desired */
}

.category-text,
.organizer-text {
  font-size: 1em; /* Set your desired font size */
  text-align: right; /* Align text to the right */
  margin: 0; /* Remove default paragraph margins */
  padding: 0;
}
</style>