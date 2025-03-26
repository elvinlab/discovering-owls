<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'
import TranslationProgress from './components/TranslationProgress.vue'

const { initializeTheme } = useTheme()

onMounted(() => {
  initializeTheme()
})
</script>

<template>
  <router-view />
  <TranslationProgress />
</template>