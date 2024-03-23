import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/allnotes',
      name: 'allnotes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AllNotesView.vue')
    },
    {
      path: '/note/:_id',
      name: 'note-details',
      component: () => import('../views/NoteDetailsView.vue')
    }
  ]
})

export default router