import { createRouter, createWebHistory } from 'vue-router'
import TreeSelect from '@/views/tree-select/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tree-select',
      name: 'TreeSelect',
      component: TreeSelect
    }
  ]
})

export default router
