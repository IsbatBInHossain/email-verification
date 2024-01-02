<template>
  <div class="text-center text-white">
    <h1 class="text-4xl font-bold mb-4">404 Not Found</h1>
    <p class="text-lg mb-4">
      Sorry, the page you are looking for does not exist.
    </p>
    <router-link
      to="/"
      class="text-slate-100 hover:underline hover:text-slate-400"
      >Go to Home</router-link
    >
    <router-link
      to="/login"
      class="ml-4 text-slate-100 hover:underline hover:text-slate-400"
      >Go to Login</router-link
    >
  </div>
</template>
