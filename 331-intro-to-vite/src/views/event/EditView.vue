<script setup lang="ts">
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { type Event } from '@/types';
import { useMessageStore } from '@/stores/message';

const props = defineProps<{
  event: Event;
  id: string;
}>();

const { event } = toRefs(props);
const router = useRouter();
const store = useMessageStore();

const editEvent = () => {
  store.updateMessage('Event data has been updated'); // Set flash message
  router.push({ name: 'event-detail-view', params: { id: props.id } }); // Navigate
};
</script>

<template>
  <p>Edit event here</p>
  <button @click="editEvent">Edit</button>
</template>
