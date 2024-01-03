<template>
  <div class="text-black bg-white p-20 pr-32 text-left rounded-lg shadow-md">
    <h2 class="text-3xl font-bold mb-4">Account Activation</h2>
    <p class="text-lg mb-6">{{ activationStatus }}</p>
    <router-link
      v-if="activationComplete"
      class="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded transition duration-300"
      to="/"
    >
      Go to Home
    </router-link>
    <router-link
      v-else
      class="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded transition duration-300"
      to="/login"
    >
      Go to Login
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      activationStatus: 'Activating your account...',
      activationComplete: false,
    }
  },
  async created() {
    const token = this.$route.params.token

    if (token) {
      try {
        // Send a request to the backend to activate the account
        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/activate/${token}`
        )

        this.activationStatus = 'Your account is activated. You can now log in.'
        this.activationComplete = true
      } catch (error) {
        console.error('Error activating account:', error)
        this.activationStatus = 'Error activating your account.'
      }
    } else {
      // Handle the case where the token is missing
      this.activationStatus = 'Invalid activation link.'
    }
  },
}
</script>
