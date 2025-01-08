import { defineStore } from 'pinia';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

import { useNuxtApp } from '#app';

export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    items: [], // Array to store items
  }),
  actions: {
    async fetchItems() {
      const { $firestore } = useNuxtApp(); // Access the Firestore instance
      try {
        const querySnapshot = await getDocs(collection($firestore, 'items'));
        this.items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched items:', this.items); // Debugging: Check fetched items
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    async addItem({ item }) {
      debugger;
      const { $firestore } = useNuxtApp();
      console.log({ item })
      await addDoc(collection($firestore, 'items'), item);
      await this.fetchItems(); // Fetch updated items after adding
    },
    async deleteItem({ dispatch }, id) {
      await deleteDoc(doc(db, 'items', id));
      dispatch('fetchItems');
    },
  },
})