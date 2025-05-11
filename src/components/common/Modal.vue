<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  title?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const close = () => {
  emit('update:modelValue', false);
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-sm w-[666px] relative"
      >
        <button
          class="absolute top-7 right-7 text-gray-500 cursor-pointer text-[32px]"
          @click="close"
          aria-label="Close"
        >
          <i class="bx bx-x"></i>
        </button>

        <!-- Header -->
        <div class="mb-4 pb-2 font-semibold text-[32px]">
          <slot name="header">
            {{ title }}
          </slot>
        </div>

        <!-- Body -->
        <div>
          <slot />
        </div>

        <!-- Footer -->
        <div class="pt-2 text-right">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
