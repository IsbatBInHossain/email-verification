<template>
  <div class="bg-slate-100 p-8 rounded shadow-md w-96">
    <h2 class="text-2xl font-semibold mb-4">Sign Up</h2>
    <form @submit.prevent="submitForm">
      <div v-for="(_, key) in userData" :key="key" class="mb-4">
        <label :for="key" class="block text-sm font-medium text-gray-600">{{
          key
        }}</label>
        <input
          :type="key === 'password' ? 'password' : 'text'"
          :id="key"
          :name="key"
          class="mt-1 p-2 w-full border rounded-md"
          v-model="userData[key]"
        />
      </div>
      <p v-if="error" class="text-red-600">
        Error submitting form: {{ error }}
      </p>
      <button
        type="submit"
        class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        :class="
          isButtonDisabled
            ? 'cursor-not-allowed bg-gray-500'
            : 'hover:bg-blue-600'
        "
        :disabled="isButtonDisabled"
      >
        Sign Up
      </button>
    </form>
    <p class="mt-4 text-gray-600 text-sm">
      Already have an account?
      <router-link to="/login" class="text-blue-500 hover:underline"
        >Go to login</router-link
      >
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userData: {
        email: '',
        firstName: '',
        lastName: '',
        mobileNumber: '',
        password: '',
      },
      error: null,
    }
  },
  computed: {
    isButtonDisabled() {
      return !Object.values(this.userData).every(value => value)
    },
  },
  methods: {
    async submitForm() {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/signup/`,
          this.userData
        )
        this.clearForm()

        this.$router.push('/activate/0')
      } catch (err) {
        console.error('Error submitting form:', err)
        this.error = err
      }
    },
    clearForm() {
      this.userData = {
        email: '',
        firstName: '',
        lastName: '',
        mobileNumber: '',
        password: '',
      }
    },
  },
}
</script>
