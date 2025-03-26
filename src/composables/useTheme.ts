import { ref, watch } from 'vue'
import { usePreferredDark } from '@vueuse/core'

export function useTheme() {
  const isDark = ref(localStorage.getItem('theme') === 'dark')
  const prefersDark = usePreferredDark()

  function toggleTheme() {
    isDark.value = !isDark.value
    updateTheme()
  }

  function updateTheme() {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark.value)
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  }

  function initializeTheme() {
    if (localStorage.getItem('theme') === null) {
      isDark.value = prefersDark.value
    }
    updateTheme()
  }

  watch(prefersDark, (newValue) => {
    if (localStorage.getItem('theme') === null) {
      isDark.value = newValue
      updateTheme()
    }
  })

  return {
    isDark,
    toggleTheme,
    initializeTheme
  }
}