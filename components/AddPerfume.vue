<template>
    <v-container>
        <v-btn icon="mdi-plus" size="small" @click="openAddPerfumeModal"></v-btn>
        <AddPerfumeModal :visible="isModalOpen" @close="closeModal" />
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import AddPerfumeModal from '~/components/AddPerfumeModal.vue';


const isModalOpen = ref(false);


const openAddPerfumeModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};
</script>

<style scoped>
div {
    display: flex;
    align-items: end;
    padding: 20px 0px;
}
</style>