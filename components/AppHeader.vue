<template>
    <v-app-bar :elevation="3">
      <template v-slot:prepend>
        <v-img src="/perfume.png" width="40px" />
      </template>
      <v-app-bar-title>ScentBook</v-app-bar-title>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'AppHeader',
  };
  </script>