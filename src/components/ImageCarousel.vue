<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useSwipe } from '@vueuse/core'
import BaseImage from '@/components/BaseImage.vue'

const props = defineProps<{
  images: Array<{
    url: string
    caption?: string
    alt: string
  }>
}>()

const currentIndex = ref(0)
const carouselRef = ref<HTMLElement | null>(null)

const { isSwiping, direction } = useSwipe(carouselRef, {
  onSwipeEnd(e) {
    if (direction.value === 'left') {
      next()
    } else if (direction.value === 'right') {
      previous()
    }
  }
})

const previous = () => {
  currentIndex.value = currentIndex.value === 0
    ? props.images.length - 1
    : currentIndex.value - 1
}

const next = () => {
  currentIndex.value = currentIndex.value === props.images.length - 1
    ? 0
    : currentIndex.value + 1
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const slideDirection = ref('slide-right')

const updateSlideDirection = (newIndex: number) => {
  const current = currentIndex.value
  const last = props.images.length - 1

  if (newIndex === 0 && current === last) {
    slideDirection.value = 'slide-right'
  } else if (newIndex === last && current === 0) {
    slideDirection.value = 'slide-left'
  } else {
    slideDirection.value = newIndex > current ? 'slide-left' : 'slide-right'
  }

  currentIndex.value = newIndex
}

// Auto-advance timer
const autoAdvanceInterval = ref<number | null>(null)
const isHovered = ref(false)

const startAutoAdvance = () => {
  if (autoAdvanceInterval.value) return
  autoAdvanceInterval.value = window.setInterval(() => {
    if (!isHovered.value) {
      updateSlideDirection((currentIndex.value + 1) % props.images.length)
    }
  }, 5000)
}

const stopAutoAdvance = () => {
  if (autoAdvanceInterval.value) {
    clearInterval(autoAdvanceInterval.value)
    autoAdvanceInterval.value = null
  }
}

// Start auto-advance on mount
startAutoAdvance()

// Clean up on unmount
onUnmounted(() => {
  stopAutoAdvance()
})
</script>

<template>
  <div
    ref="carouselRef"
    class="image-carousel relative overflow-hidden rounded-xl bg-gray-800"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Main Image -->
    <div class="aspect-[16/9] relative">
      <transition :name="slideDirection" mode="out-in">
        <div
          :key="currentIndex"
          class="absolute inset-0"
        >
          <BaseImage
            :src="images[currentIndex].url"
            :alt="images[currentIndex].alt"
            class="w-full h-full object-cover"
          />

          <!-- Caption -->
          <div
            v-if="images[currentIndex].caption"
            class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
          >
            <p class="text-white text-sm md:text-base">
              {{ images[currentIndex].caption }}
            </p>
          </div>
        </div>
      </transition>
    </div>

    <!-- Navigation Arrows -->
    <button
      @click="previous"
      class="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
      aria-label="Previous image"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      @click="next"
      class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
      aria-label="Next image"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Dots Navigation -->
    <div
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2"
      role="tablist"
      aria-label="Image carousel navigation"
    >
      <button
        v-for="(_, index) in images"
        :key="index"
        @click="goToSlide(index)"
        class="w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
        :class="[
          currentIndex === index
            ? 'bg-white w-4'
            : 'bg-white/50 hover:bg-white/70'
        ]"
        :aria-label="`Go to image ${index + 1}`"
        :aria-selected="currentIndex === index"
        role="tab"
      />
    </div>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}
</style>