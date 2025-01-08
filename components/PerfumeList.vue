<template>
    <v-app>
        <v-container>
            <v-list lines="three">
                <v-list-item v-for="(item, index) in itemList" :key="item.id">
                    <template v-slot:title>Наименование: {{ item.name }}</template>
                    <template v-slot:subtitle>Бренд: {{ item.brand }}</template>
                    <v-col> Парфюмер: {{ item.perfumer }}</v-col>
                    <v-col> Направление: {{ item.fragranceFamily }}</v-col>
                    <v-col> Основные ноты: {{ item.mainAccords }}</v-col>
                    <v-col> {{ item.mainAccords }}</v-col>
                    <v-divider v-if="index !== itemList.length - 1"></v-divider>

                </v-list-item>

            </v-list>
        </v-container>
    </v-app>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useWebsiteStore } from '~/stores/basicStore';

const websiteStore = useWebsiteStore();
const { items, fetchItems, addItem, deleteItem } = websiteStore;


console.log({ items })
const isMounted = ref(false)
const itemList = computed(() => websiteStore.items);
console.log({ length: itemList.value.length, value: itemList.value })
// Fetch items when the component is mounted
onMounted(() => {
    fetchItems();
    isMounted.value = true;
    itemList.value = items;
});


</script>