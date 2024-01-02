import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/Home.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuthenticated = async () => {
          try {
            // Make a request to the protected route to check if the user is authenticated
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/protected`,
              { withCredentials: true }
            )

            return response.data.isActivated
          } catch (error) {
            console.error('Error checking authentication:', error)
            return false
          }
        }

        // Check if the user is authenticated
        if (await isAuthenticated()) {
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
