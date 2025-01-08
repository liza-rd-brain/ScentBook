<template>
    <v-app>
        <v-container>
            <v-card v-if="!isEditing" hover variant="outlined" class="hover-outlined">
                <div className="editButton">
                    <v-btn icon="mdi-pencil" size="small" @click="isEditing = true"></v-btn>
                </div>
                <template v-slot:title>Наименование: {{ displayItem.name }}</template>
                <template v-slot:subtitle>Бренд: {{ displayItem.brand }}</template>
                <v-col> Парфюмер: {{ displayItem.perfumer }}</v-col>
                <v-col> Направление: {{ displayItem.fragranceFamily }}</v-col>
                <v-col> Основные ноты: {{ displayItem.mainAccords }}</v-col>
                <v-col> {{ displayItem.mainAccords }}</v-col>
            </v-card>

            <EditPerfumeForm v-else @close="isEditing = false" />

        </v-container>
    </v-app>
</template>

<script setup>
import { useWebsiteStore } from '~/stores/basicStore';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import EditPerfumeForm from '~/components/EditPerfumeForm.vue';

const websiteStore = useWebsiteStore();
const route = useRoute();
const isEditing = ref(false);




// Fetch data during SSR or fall back to client-side fetching
await useAsyncData(
    'item', // Unique key for caching
    async () => {
        const itemId = Number(route.params.id);

        // Check if the item already exists in the store
        const existingItem = websiteStore.findItemById(itemId);
        if (existingItem) {
            websiteStore.setCurrItem(existingItem)
            return existingItem; // Use the item from the store
        }

        const { data } = await websiteStore.fetchItemByCustomId(itemId);
        return data;
    }
);



// Use a computed property to access the item reactively
const item = computed(() => {
    const itemId = route.params.id;
    return websiteStore.findItemById(itemId)
});


console.log({ currItem: websiteStore.currItem })

const displayItem = computed(() => websiteStore.currItem || item.value);

</script>

<style scoped>
.editButton {
    position: absolute;
    right: 10px;
    top: 10px
}
</style>
