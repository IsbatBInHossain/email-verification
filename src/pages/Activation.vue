<!-- ActivateAccount.vue -->
<template>
  <div>
    <h2>Account Activation</h2>
    <p v-if="token">{{ activationStatus }}</p>
    <p v-else>Please Verify your accout</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      activationStatus: 'Activating your account...',
    }
  },
  async created() {
    const token = this.$route.params.token

    try {
      // Send a request to the backend to activate the account
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/activate/${token}`
      )

      this.activationStatus = response.data.message
    } catch (error) {
      console.error('Error activating account:', error)
      this.activationStatus = 'Error activating your account.'
    }
  },
}
</script>
