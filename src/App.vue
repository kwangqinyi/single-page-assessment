<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Header from './components/common/Header.vue';
import TableList from './components/common/TableList.vue';
import Pagination from './components/common/Pagination.vue';
import DetailModal from './components/DetailModal.vue';
import { apiFetchUsers } from './apis/index';
import { useThemeStore } from './stores/theme';
const theme = useThemeStore();

const users = ref([]);
const selectedUser = ref(null);
const modalVisible = ref(false);

const page = ref(1);
const pageSize = ref(10);
const total = ref(100); // hardcode as unable to determine
const isLoading = ref(false);

const columns = [
  {
    key: 'registeredDate',
    label: 'Registered Date',
    sortable: true,
    dataType: 'dateTime',
    width: 200,
  },
  { key: 'name', label: 'Name', sortable: true, width: 400 },
  { key: 'gender', label: 'Gender', sortable: true, width: 100 },
  { key: 'country', label: 'Country', sortable: true, width: 150 },
  { key: 'email', label: 'Email', sortable: true, width: 280, align: 'end' },
];

const handleSelect = (user: any) => {
  selectedUser.value = user;
  modalVisible.value = true;
};

const refresh = async () => {
  users.value = [];
  page.value = 1;
  fetchData();
};

const closeModal = () => {
  modalVisible.value = false;
};

const fetchData = async () => {
  isLoading.value = true;
  const data = await apiFetchUsers({
    results: pageSize.value,
    page: page.value,
  });
  isLoading.value = false;

  users.value = data?.results?.map((u: any) => ({
    ...u,
    name: `${u.name.title} ${u.name.first} ${u.name.last}`,
    thumbnail: u.picture.thumbnail,
    gender: u.gender === 'male' ? 'Male' : 'Female',
    email: u.email,
    country: u.location.country,
    age: u.dob.age,
    registeredDate: u.registered.date,
  }));
};

watch(page, () => {
  fetchData();
});

onMounted(() => {
  fetchData();
  theme.initializeTheme();
});
</script>

<template>
  <div>
    <Header />
    <div class="w-full max-w-screen-xl mx-auto py-6 mb-10">
      <TableList
        :data="users"
        :columns="columns"
        :clickableRow="true"
        :allowRefresh="true"
        :allowSearch="true"
        @refresh="refresh"
        @select="handleSelect"
        :isLoading="isLoading"
      >
        <template #prop-registeredDate="{ row }">
          {{
            new Date(row.registeredDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          }}
        </template>
      </TableList>

      <Pagination v-model:page="page" :page-size="pageSize" :total="100" />

      <DetailModal
        v-if="selectedUser"
        :user="selectedUser"
        v-model="modalVisible"
        @close="selectedUser = null"
      />
    </div>
  </div>
</template>
