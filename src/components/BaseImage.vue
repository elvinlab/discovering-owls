<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps<{
  src: string
  alt: string
  lazy?: boolean
}>()

const imgRef = ref<HTMLImageElement | null>(null)
const isLoaded = ref(false)
const isIntersecting = ref(false)

if (props.lazy) {
  useIntersectionObserver(imgRef, ([{ isIntersecting: intersecting }]) => {
    isIntersecting.value = intersecting
  })
}
</script>

<template>
  <div class="base-image" :class="{ 'is-loaded': isLoaded }">
    <img
      ref="imgRef"
      :src="lazy && !isIntersecting ? '' : src"
      :alt="alt"
      @load="isLoaded = true"
    />
    <div v-if="!isLoaded" class="skeleton" />
  </div>
</template>

<style lang="scss" scoped>
.base-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; // 16:9 aspect ratio
  overflow: hidden;
  background: var(--bg-surface);
  border-radius: 0.5rem;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.is-loaded img {
    opacity: 1;
  }

  .skeleton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--bg-surface) 0%,
      var(--bg-input) 50%,
      var(--bg-surface) 100%
    );
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>