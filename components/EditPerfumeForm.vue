<template>

    <v-container>
        <v-text-field v-model="name" color="primary" label="Название" variant="underlined"></v-text-field>

        <v-text-field v-model="brand" color="primary" label="Бренд" variant="underlined"></v-text-field>

        <v-text-field v-model="fragranceFamily" color="primary" label="Направление" variant="underlined"></v-text-field>

        <v-text-field v-model="mainAccords" color="primary" label="Основные ноты" variant="underlined"></v-text-field>

        <v-text-field v-model="perfumer" color="primary" label="Парфюмер" variant="underlined"></v-text-field>
        <v-text-field v-model="link" color="primary" label="Ссылка" variant="underlined"></v-text-field>

        <v-checkbox v-model="terms" color="secondary" label="добавить на мою полку"></v-checkbox>
        <v-spacer></v-spacer>


        <v-sheet>
            <v-container> <v-row justify="space-between">
                    <v-btn color="success" @click="editPerfume">
                        сохранить изменения
                    </v-btn>

                    <v-btn color="error" @click="deletePerfume">
                        удалить
                    </v-btn>

                </v-row>
            </v-container>

        </v-sheet>

    </v-container>


</template>

<script setup>
import { ref } from 'vue';
import { useWebsiteStore } from '@/stores/basicStore'
import { useItemActions } from '@/composables/useItemActions';
import { Timestamp } from "firebase/firestore";
import { useRouter } from 'vue-router';

const router = useRouter();
const { editItem, deleteItem } = useItemActions();
const store = useWebsiteStore()


const name = ref(store.currItem.name);
const brand = ref(store.currItem.brand);
const fragranceFamily = ref(store.currItem.fragranceFamily);
const mainAccords = ref(store.currItem.mainAccords);
const perfumer = ref(store.currItem.perfumer);
const link = ref(store.currItem.link);
const terms = ref(store.currItem.terms);

// из дочернего компонента можем тригернуть родительский коллбек
const emit = defineEmits(['close']);

const closeEdit = () => {
    emit('close');
};

const editPerfume = async () => {
    const newItem = {
        ...store.currItem,
        name: name.value,
        brand: brand.value,
        fragranceFamily: fragranceFamily.value,
        mainAccords: mainAccords.value,
        perfumer: perfumer.value,
        link: link.value,
        terms: terms.value,
        updatedAt: Timestamp.now(),  // Automatically adds the server timestamp
    };


    await editItem(newItem);
    closeEdit();

};

const deletePerfume = async () => {

    await deleteItem(store.currItem);
    router.push({ path: "/" })

};

</script>
