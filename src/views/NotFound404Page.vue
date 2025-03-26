<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-gray-50 dark:bg-gray-900">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
      <router-link
        to="/"
        class="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Return Home
      </router-link>
    </div>
  </div>
</template>