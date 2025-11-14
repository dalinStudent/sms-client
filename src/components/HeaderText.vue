<template>
    <div class="header-wrapper">
      <img src="@/assets/images/auto-message.png" alt="Logo" class="image" />
      <div class="text">
        <h1 class="title">{{ title }}</h1>
        <p class="subtitle" v-if="subtitle">{{ subtitle }}</p>
        <span class="border-header"></span>
      </div>
    </div>
  </template>

  <script lang="ts" setup>
  const props = defineProps<{
    title: string
    subtitle?: string
  }>()
  </script>
  