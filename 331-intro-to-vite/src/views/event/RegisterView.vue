<script setup lang="ts">
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { type Event } from '@/types';
import { useMessageStore } from '@/stores/message'; // Added

const props = defineProps<{
  event: Event;
}>();

const { event } = toRefs(props);
const router = useRouter();
const store = useMessageStore(); // Added

const register = () => {
  // Registration success logic
  store.updateMessage('You are successfully registered for ' + event.value.title); // Added

  setTimeout(() => {
    store.resetMessage(); // Added
  }, 3000);

  router.push({ name: 'event-detail-view', params: { id: event.value.id } }); // Replaced to include params
};
</script>

<template>
  <p>Register event here</p>
  <button @click="register">Register</button>
</template>
