<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Button from './Button.vue';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  dataType?: string;
}

const props = defineProps<{
  columns: Column[];
  data: any[];
  allowRefresh?: boolean;
  allowSearch?: boolean;
  isLoading?: boolean;
  clickableRow?: boolean;
  height?: number;
}>();

const search = ref('');
const sortKey = ref('');
const sortDirection = ref<'asc' | 'desc'>('asc');

const emit = defineEmits<{
  (e: 'refresh'): void;
  (e: 'select', row: any): void;
}>();

const selectRow = (row: any) => {
  emit('select', row);
};

const refresh = () => {
  search.value = '';
  sortKey.value = '';
  emit('refresh');
};

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDirection.value = 'asc';
  }
};

const filteredData = computed(() => {
  let filtered = props.data;

  // allow filter all columns data
  if (search.value) {
    const query = search.value.toLowerCase();
    filtered = filtered.filter((row) =>
      props.columns.some((col) =>
        String(row[col.key] ?? '')
          .toLowerCase()
          .includes(query)
      )
    );
  }

  if (sortKey.value) {
    const col = props.columns.find((c) => c.key === sortKey.value);
    const type = col?.dataType ?? 'string';

    filtered = [...filtered].sort((a, b) => {
      const valA = a[sortKey.value];
      const valB = b[sortKey.value];

      if (valA == null || valB == null) return 0;

      let result = 0;

      switch (type) {
        case 'number':
          result = Number(valA) - Number(valB);
          break;

        case 'dateTime':
          result = Date.parse(valA) - Date.parse(valB);
          break;

        default:
          result = String(valA).localeCompare(String(valB));
          break;
      }

      return sortDirection.value === 'asc' ? result : -result;
    });
  }

  return filtered;
});
</script>

<template>
  <div>
    <div class="flex items_center justify-between flex-wrap mb-4 px-3">
      <input
        v-if="allowSearch"
        v-model="search"
        placeholder="Search"
        class="border py-2 px-3 rounded-lg text-gray-900 border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-primary"
      />
    </div>

    <div class="relative overflow-x-auto px-3">
      <!-- Header -->

      <div
        class="flex px-7 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300"
      >
        <div
          v-for="col in columns"
          :key="col.key"
          @click="col.sortable ? handleSort(col.key) : null"
          class="mr-4"
          :class="[
            { 'cursor-pointer': col.sortable },
            { 'text-primary': sortKey === col.key },
          ]"
          :style="{
            minWidth: col.width ? `${col.width}px` : '100px',
            maxWidth: !col.width ? '200px' : undefined,
            textAlign: col.align || 'start',
          }"
        >
          <div class="inline-flex items-center gap-1">
            {{ col.label }}
            <i v-if="col.sortable" class="bx bx-sort text-xs" />
          </div>
        </div>
      </div>

      <!-- Columns - Card List -->
      <div class="space-y-2 pb-3">
        <div
          v-for="row in filteredData"
          :key="row.id ?? row.email"
          @click="selectRow(row)"
          class="bg-card-bg w-min rounded-xl shadow p-7 transition hover:shadow-md border border-transparent hover:border-primary hover:border-1"
          :class="[clickableRow ? 'cursor-pointer' : '']"
        >
          <div class="flex gap-4">
            <div
              v-for="col in columns"
              :key="col.key"
              class="flex flex-col"
              :style="{
                minWidth: col.width ? `${col.width}px` : '100px',
                textAlign: col.align || 'start',
              }"
            >
              <span class="text-sm text-gray-800 dark:text-gray-100">
                <slot :name="`prop-${col.key}`" :row="row">
                  {{ row[col.key] }}
                </slot>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="filteredData.length === 0"
        class="h-[300px] flex justify-center items-center"
      >
        <!-- Loading (when refreshing) -->
        <template v-if="isLoading">
          <slot name="loading">Loading data</slot>
        </template>
        <!-- Empty Data -->
        <template v-else>
          <slot name="empty">No data</slot>
        </template>
      </div>
    </div>

    <div class="mt-8 mx-auto text-center" v-if="allowRefresh">
      <Button type="tertiary" @click="refresh">
        <template #icon><i class="bx bx-refresh text-lg" /></template>
        Refresh
      </Button>
    </div>
  </div>
</template>
