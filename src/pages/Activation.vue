<template>
  <div class="text-black bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Account Activation</h2>
    <p class="text-base mb-6">
      An activation link has been sent to your email. Please activate your
      account before proceeding.
    </p>
    <div class="flex flex-col space-y-4">
      <router-link
        class="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded transition duration-300"
        to="/login"
      >
        Go to Login
      </router-link>
      <router-link
        class="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded transition duration-300"
        to="/sign-up"
      >
        Go to Sign Up
      </router-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>
