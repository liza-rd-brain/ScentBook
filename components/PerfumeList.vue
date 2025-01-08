<template>
    <v-app>
        <v-container>
            <v-list lines="three">
                <v-list-item v-for="(item, index) in itemList" :key="item.id">
                    <NuxtLink :to="{ name: 'perfumeDetail-id', params: { id: item.id } }">
                        <v-card hover variant="outlined" class="hover-outlined">
                            <template v-slot:title>Наименование: {{ item.name }}</template>
                            <template v-slot:subtitle>Бренд: {{ item.brand }}</template>
                            <v-col> Парфюмер: {{ item.perfumer }}</v-col>
                            <v-col> Направление: {{ item.fragranceFamily }}</v-col>
                            <v-col> Основные ноты: {{ item.mainAccords }}</v-col>
                            <v-col> {{ item.mainAccords }}</v-col>
                            <v-divider v-if="index !== itemList.length - 1"></v-divider>
                        </v-card>
                    </NuxtLink>
                </v-list-item>
            </v-list>
        </v-container>
    </v-app>
</template>

<script setup>
import { computed } from 'vue';
import { useWebsiteStore } from '~/stores/basicStore';

const websiteStore = useWebsiteStore();


// Fetch items using useAsyncData (SSR)
await useAsyncData('items', async () => {
    await websiteStore.fetchItemsInitial(); // Fetch items from the store
    console.log("Fetch items from the store")
    return websiteStore.items; // Return the items from the store
});

// Use a computed property to access the items (reactive updates)
const itemList = computed(() => websiteStore.items);

console.log({ itemList: itemList.value }); // Debugging: Check initial items
</script>

<style scoped>
.hover-outlined {
    border: 1px solid transparent;
    transition: border-color 0.3s ease;
}

.hover-outlined:hover {
    border: 1px solid white;

}
</style>