<template>
    <div>
      <!-- Header -->
      <Header />
  
      <!-- Page Content -->
      <Nuxt />
  
      <!-- Footer -->
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    components: {
      Header,
      Footer,
    },
  };
  </script>
  
  <style>
  /* Add global styles here if needed */
  </style>