<template>
    <v-app>
        <v-container>
            <v-card hover variant="outlined" class="hover-outlined">
                <template v-slot:title>Наименование: {{ displayItem.name }}</template>
                <template v-slot:subtitle>Бренд: {{ displayItem.brand }}</template>
                <v-col> Парфюмер: {{ displayItem.perfumer }}</v-col>
                <v-col> Направление: {{ displayItem.fragranceFamily }}</v-col>
                <v-col> Основные ноты: {{ displayItem.mainAccords }}</v-col>
                <v-col> {{ displayItem.mainAccords }}</v-col>
            </v-card>

        </v-container>
    </v-app>
</template>

<script setup>
import { useWebsiteStore } from '~/stores/basicStore';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const websiteStore = useWebsiteStore();
const route = useRoute();

// Fetch data during SSR or fall back to client-side fetching
const { data: ssrItem } = await useAsyncData(
    'item', // Unique key for caching
    async () => {
        const itemId = Number(route.params.id);

        // Check if the item already exists in the store
        const existingItem = websiteStore.findItemById(itemId);
        if (existingItem) {
            return existingItem; // Use the item from the store
        }

        const { data } = await websiteStore.fetchItemByCustomId(itemId);
        return data;
    }
);



// Use a computed property to access the item reactively
const item = computed(() => {
    const itemId = route.params.id;
    return websiteStore.items.find((item) => String(item.id) === itemId);
});

const displayItem = computed(() => websiteStore.currItem || item.value);



</script>
