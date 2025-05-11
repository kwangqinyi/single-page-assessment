<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  page: number;
  pageSize: number;
  total: number;
}>();

const emit = defineEmits(['update:page']);

const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

const prev = () => {
  if (props.page > 1) emit('update:page', props.page - 1);
};

const next = () => {
  if (props.page < totalPages.value) emit('update:page', props.page + 1);
};

const updatePage = (p: number) => {
  emit('update:page', p);
};
</script>

<template>
  <div class="flex gap-2 items-center justify-end mt-4">
    <button @click="prev" :disabled="page <= 1">
      <i class="bx bx-chevron-left text-lg flex" />
    </button>

    <button
      v-for="p in totalPages"
      :key="p"
      @click="updatePage(p)"
      class="w-7 h-7 border border-secondary rounded-full cursor-pointer"
      :class="{ 'bg-bg-secondary text-pagination-active': p === page }"
    >
      {{ p }}
    </button>

    <button @click="next" :disabled="page >= totalPages">
      <i class="bx bx-chevron-right text-lg flex" />
    </button>
  </div>
</template>
