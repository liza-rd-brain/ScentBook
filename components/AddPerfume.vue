<template>
    <div>
        <!-- Button to open the modal -->
        <v-btn icon="mdi-plus" size="small" @click="openAddPerfumeModal"></v-btn>

        <!-- AddPerfumeModal component -->
        <AddPerfumeModal :visible="isModalOpen" @close="closeModal" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AddPerfumeModal from '~/components/AddPerfumeModal.vue';

// State to control the modal
const isModalOpen = ref(false);

// Function to open the modal
const openAddPerfumeModal = () => {
    isModalOpen.value = true;
};

// Function to close the modal
const closeModal = () => {
    isModalOpen.value = false;
};
</script>