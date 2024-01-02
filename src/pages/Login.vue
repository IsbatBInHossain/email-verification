<template>
  <div class="bg-slate-100 p-8 rounded shadow-md w-96">
    <h2 class="text-2xl font-semibold mb-4">Login</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-600"
          >Email</label
        >
        <input
          type="email"
          id="email"
          name="email"
          class="mt-1 p-2 w-full border rounded-md"
          v-model="email"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-600"
          >Password</label
        >
        <input
          type="password"
          id="password"
          name="password"
          class="mt-1 p-2 w-full border rounded-md"
          v-model="password"
        />
      </div>
      <p v-if="error" class="text-red-600">Login Error: {{ error }}</p>
      <button
        type="submit"
        class="bg-blue-500 text-white py-2 px-4 rounded-md"
        :class="
          isButtonDisabled
            ? 'cursor-not-allowed bg-gray-500'
            : 'hover:bg-blue-600'
        "
        :disabled="isButtonDisabled"
      >
        Log In
      </button>
    </form>
    <p class="mt-4 text-gray-600 text-sm">
      Don't have an account?
      <router-link to="/sign-up" class="text-blue-500 hover:underline"
        >Go to signup</router-link
      >
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    isButtonDisabled() {
      return !this.email || !this.password
    },
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    generateToken() {
      return (
        Math.random().toString(36).substring(2, 10) +
        Math.random().toString(36).substring(2, 10)
      )
    },
    async submitForm() {
      const userData = {
        email: this.email,
        password: this.password,
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/login`,
          userData
        )
        console.log(response)

        // Check activation status regardless of the response status
        if (response.data.activated) {
          const authToken = this.generateToken()
          localStorage.setItem('authToken', authToken)
          this.$router.push('/')
        } else {
          this.$router.push('/activate')
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        if (error.response) {
          // Server responded with an error status code
          if (error.response.status === 403) {
            // Handle account not activated
            console.log(
              'Account not activated. Redirecting to activation page.'
            )
          } else {
            this.error = error.response.data.error || 'Internal Server Error'
          }
        } else {
          // Network error (e.g., the server is not reachable)
          this.error = 'Network error. Please try again later.'
        }
      }
    },
  },
}
</script>
