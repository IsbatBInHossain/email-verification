import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/Home.vue'),
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: () => import('../pages/SignUp.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/Login.vue'),
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../pages/NotFound.vue'),
    },
  ],
})
