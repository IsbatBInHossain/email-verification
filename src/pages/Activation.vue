<template>
  <div>
    <h2>Account Activation</h2>
    <p>{{ activationStatus }}</p>
    <router-link v-if="activationComplete" to="/">Go to Home</router-link>
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
