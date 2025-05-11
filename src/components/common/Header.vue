<script setup lang="ts">
import { useThemeStore } from '../../stores/theme';
import Button from './Button.vue';
import avatar from '@/assets/image/Avatar.png';
import logo from '@/assets/image/Logo.png';
const theme = useThemeStore();

// dummy icons
const icons = [{ icon: 'bell' }, { icon: 'cog' }, { icon: 'log-out' }];
</script>

<template>
  <!-- Header -->
  <div class="sticky z-20 top-0 bg-bg-primary shadow-xl">
    <div class="h-[90px] flex items-center justify-center">
      <div
        class="w-full max-w-screen-xl flex justify-between items-center px-3"
      >
        <img class="h-[56px] w-[170px]" :src="logo" alt="profile" />

        <div class="flex gap-6 items-center">
          <button
            @click="theme.toggleTheme"
            class="transition bg-bg-primary hover:bg-bg-secondary hover:text-secondary rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
          >
            <i :class="`bx bx-${theme.isDark ? 'sun' : 'moon'} text-lg`" />
          </button>
          <button
            v-for="item in icons"
            :key="item.icon"
            class="transition bg-bg-primary hover:bg-bg-secondary hover:text-secondary rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
          >
            <i :class="`bx bx-${item.icon} text-xl`" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Personal Info Area -->
  <div
    class="h-[154px] bg-profile-bg text-white pt-12 mb-14 flex items-center gap-6 justify-center"
  >
    <div
      class="w-full max-w-screen-xl text-white py-6 flex items-center gap-6 px-3"
    >
      <!-- Profile Picture -->
      <img
        class="w-[148px] h-[148px] object-cover mt-10"
        :src="avatar"
        alt="profile"
      />

      <!-- Name -->
      <div>
        <h2 class="text-2xl font-semibold text-[40px]">John Doe</h2>
        <p class="text-sm">Last online: 2 days ago</p>
      </div>

      <!-- Buttons -->
      <div class="flex gap-3 pt-[26px]">
        <Button type="primary">
          <template #icon><i class="bx bx-send text-lg"></i></template>
          Send Message
        </Button>

        <Button type="secondary">
          <template #icon><i class="bx bx-plus text-lg"></i></template>
          Add Friend
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'boxicons/css/boxicons.min.css';
</style>
