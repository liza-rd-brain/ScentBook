<template>

    <v-container>
        <v-text-field v-model="name" color="primary" label="Название" variant="underlined"></v-text-field>

        <v-text-field v-model="brand" color="primary" label="Бренд" variant="underlined"></v-text-field>

        <v-text-field v-model="fragranceFamily" color="primary" label="Направление" variant="underlined"></v-text-field>

        <v-text-field v-model="mainAccords" color="primary" label="Основные ноты" variant="underlined"></v-text-field>

        <v-text-field v-model="perfumer" color="primary" label="Парфюмер" variant="underlined"></v-text-field>
        <v-text-field v-model="link" color="primary" label="Ссылка" variant="underlined"></v-text-field>

        <v-checkbox v-model="terms" color="secondary" label="добавить на мою полку"></v-checkbox>
    </v-container>


</template>

<script setup>
import { ref } from 'vue';
import { useWebsiteStore } from '@/stores/basicStore'
import { Timestamp } from "firebase/firestore";

const store = useWebsiteStore()

const name = ref(null);
const brand = ref(null);
const fragranceFamily = ref(null);
const mainAccords = ref(null);
const perfumer = ref(null);
const link = ref(null);
const terms = ref(false);





</script>
