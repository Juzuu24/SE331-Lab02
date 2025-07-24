<script setup lang="ts">
import { toRefs, defineProps, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useMessageStore } from '@/stores/message';
import { type Event } from '@/types';

const props = defineProps<{
  event: Event;
}>();

const { event } = toRefs(props);

// Flash message handling
const store = useMessageStore();
const { message } = storeToRefs(store);

// Optional: reset the flash message after a delay
onMounted(() => {
  if (message.value) {
    setTimeout(() => {
      store.resetMessage();
    }, 3000);
  }
});
</script>

<template>
  <div>
    <!-- Flash message -->
    <div v-if="message" id="flashMessage">
      <h4>{{ message }}</h4>
    </div>

    <!-- Event details -->
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<style scoped>
@keyframes yellofade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}

#flashMessage {
  animation: yellofade 3s ease-in-out;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
