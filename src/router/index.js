import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/Home.vue'),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = () => {
          const token = localStorage.getItem('authToken')
          return !!token
        }

        // Check if the user is authenticated
        if (isAuthenticated()) {
          next()
        } else {
          next({ name: 'Login' }) // Redirect to the Login route if not authenticated
        }
      },
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
      path: '/activate/:token',
      name: 'Activation',
      component: () => import('../pages/Activation.vue'),
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../pages/NotFound.vue'),
    },
  ],
})
