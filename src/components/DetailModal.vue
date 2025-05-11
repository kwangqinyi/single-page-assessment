<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import Modal from './common/Modal.vue';

const props = defineProps<{
  user: any;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

const localVisible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    localVisible.value = val;
  }
);

watch(localVisible, (val) => {
  emit('update:modelValue', val);
  if (!val) emit('close');
});

const details = computed(() => {
  if (!props.user) return [];

  return [
    {
      key: 'date',
      label: 'Date',
      value: formatDate(props.user.registeredDate),
    },
    { key: 'status', label: 'Status', value: props.user.status ?? 'Inactive' },
    { key: 'gender', label: 'Gender', value: props.user.gender },
    { key: 'country', label: 'Country', value: props.user.country },
    { key: 'email', label: 'Email', value: props.user.email },
  ];
});

const formatDate = (val) => {
  return new Date(val).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
</script>

<template>
  <Modal v-model="localVisible" :title="user.name">
    <div v-if="user" class="space-y-2">
      <div class="space-y-3">
        <div v-for="item in details" :key="item.key" class="flex">
          <div class="w-[100px] text-gray-400">{{ item.label }}:</div>
          <div class="text-main-text">{{ item.value }}</div>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-400">No user selected</div>
  </Modal>
</template>
