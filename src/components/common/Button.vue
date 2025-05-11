<script setup lang="ts">
const props = defineProps<{
  type: 'secondary' | 'primary' | 'tertiary';
}>();

const typeClass = {
  secondary:
    'bg-transparent text-white border-white hover:bg-white hover:text-primary',
  primary:
    'bg-white text-primary border-white hover:bg-transparent hover:text-white',
  tertiary:
    'bg-btn-solid text-white border-transparent hover:bg-btn-solid-hover',
}[props.type];
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 px-4 py-2 rounded font-medium border transition text-base cursor-pointer',
      typeClass,
    ]"
    @click="$emit('click')"
  >
    <slot name="icon" />
    <span v-if="$slots.default"><slot /></span>
  </button>
</template>
