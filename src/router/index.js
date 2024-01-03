import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
// import jwt from 'jsonwebtoken'

// parseJWT
const parseJwt = token => {
  if (!token) {
    return
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}

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
            // Get Auth token from localStorage
            const token = localStorage.getItem('authToken')
            const data = parseJwt(token)

            return data.isActivated
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
      path: '/activate',
      name: 'Activation',
      component: () => import('../pages/Activation.vue'),
    },
    {
      path: '/activate/:token',
      name: 'ActivationConfirm',
      component: () => import('../pages/ActivationConfirm.vue'),
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../pages/NotFound.vue'),
    },
  ],
})
