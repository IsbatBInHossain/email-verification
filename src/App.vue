<template>
  <div class="bg-white p-8 rounded shadow-md w-96">
    <h2 class="text-2xl font-semibold mb-4">Sign Up</h2>
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
        />
      </div>
      <div class="mb-4">
        <label for="firstName" class="block text-sm font-medium text-gray-600"
          >First Name</label
        >
        <input
          type="text"
          id="firstName"
          name="firstName"
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div class="mb-4">
        <label for="lastName" class="block text-sm font-medium text-gray-600"
          >Last Name</label
        >
        <input
          type="text"
          id="lastName"
          name="lastName"
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div class="mb-4">
        <label
          for="mobileNumber"
          class="block text-sm font-medium text-gray-600"
          >Mobile Number</label
        >
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          class="mt-1 p-2 w-full border rounded-md"
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
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    submitForm() {
      console.log('Form submitted!')
    },
  },
}
</script>
