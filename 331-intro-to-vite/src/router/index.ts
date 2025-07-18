import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/EventListView.vue'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import StudentView from '@/views/StudentView.vue'
import EventDetailView from '@/views/EventDetailView.vue'
import { parse } from 'vue/compiler-sfc'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1')})
    },
    {
      path: '/event/:id',
      name: 'event-detail-view',
      component: EventDetailView,
      props:true
    },

    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView
    },
  ],
})

export default router
