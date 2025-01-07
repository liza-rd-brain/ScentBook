<template>
  <v-app>
    <!-- Header -->
    <AppHeader />

    <!-- Page Content -->
    <slot />

    <!-- Footer -->
    <!-- <Footer /> -->
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
// import Footer from '@/components/Footer.vue';
</script>

<style>
/* Add global styles here if needed */
</style>