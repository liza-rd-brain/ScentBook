<template>
    <Teleport to="body">
        <div v-if="visible" class="modal-overlay">
            <div class="modal-content">

                <v-card class="mx-auto" min-width="300" title="">
                    <v-btn class="close-button" icon @click="closeModal" variant="plain">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-container>
                        <v-text-field v-model="name" color="primary" label="Название"
                            variant="underlined"></v-text-field>

                        <v-text-field v-model="brand" color="primary" label="Бренд" variant="underlined"></v-text-field>

                        <v-text-field v-model="fragranceFamily" color="primary" label="Направление"
                            variant="underlined"></v-text-field>

                        <v-text-field v-model="mainAccords" color="primary" label="Основные ноты"
                            variant="underlined"></v-text-field>

                        <v-text-field v-model="perfumer" color="primary" label="Парфюмер"
                            variant="underlined"></v-text-field>
                        <v-text-field v-model="link" color="primary" label="Ссылка" variant="underlined"></v-text-field>

                        <v-checkbox v-model="terms" color="secondary" label="добавить на мою полку"></v-checkbox>
                    </v-container>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="success" @click="addItemToStore">
                            добавить в коллекцию
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import { useWebsiteStore } from '@/stores/basicStore'
// Define props
defineProps({
    visible: {
        type: Boolean,
        required: true,
    },
});
const store = useWebsiteStore()

// из дочернего компонента можем тригернуть родительский коллбек
const emit = defineEmits(['close']);

// Form data
const name = ref(null);
const brand = ref(null);
const fragranceFamily = ref(null);
const mainAccords = ref(null);
const perfumer = ref(null);
const link = ref(null);
const terms = ref(false);

// Function to close the modal
const closeModal = () => {
    emit('close');
};

const addItemToStore = async () => {
    const newItem = {
        id: Date.now(), // Generate a unique ID (you can use a library like `uuid` for better IDs)
        name: name.value,
        brand: brand.value,
        fragranceFamily: fragranceFamily.value,
        mainAccords: mainAccords.value,
        perfumer: perfumer.value,
        link: link.value,
        terms: terms.value,
    };

    debugger;
    console.log({ newItem })

    // Add the item to the Pinia store
    // itemsStore.addItem(newItem);
    await store.addItem({ item: newItem })
    // Reset form fields
    name.value = '';
    brand.value = '';
    fragranceFamily.value = '';
    mainAccords.value = '';
    perfumer.value = '';
    link.value = '';
    terms.value = false;

    // Close the modal
    closeModal();
};

</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* Ensure it's above other content */
}

.modal-content {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1001;
    /* Ensure it's above the modal content */
}
</style>