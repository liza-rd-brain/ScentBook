// store/index.js
import { db } from '~/plugins/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export const state = () => ({
    items: [],
});

export const mutations = {
    SET_ITEMS(state, items) {
        state.items = items;
    },
};

export const actions = {
    async fetchItems({ commit }) {
        const querySnapshot = await getDocs(collection(db, 'items'));
        const items = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        commit('SET_ITEMS', items);
    },
    async addItem({ dispatch }, item) {
        await addDoc(collection(db, 'items'), item);
        dispatch('fetchItems');
    },
    async deleteItem({ dispatch }, id) {
        await deleteDoc(doc(db, 'items', id));
        dispatch('fetchItems');
    },
};