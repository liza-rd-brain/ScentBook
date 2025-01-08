import { defineStore } from 'pinia';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, limit } from 'firebase/firestore';

import { useNuxtApp } from '#app';

export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    items: [], // Array to store items
  }),
  actions: {
    async fetchItemsInitial() {
      const { $firestore } = useNuxtApp(); // Access the Firestore instance
      try {
        debugger;
        // Query to fetch the last 5 items sorted by createdAt (descending)
        const q = query(
          collection($firestore, 'items'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );

        const querySnapshot = await getDocs(q);
        this.items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched last 5 items:', this.items); // Debugging: Check fetched items
      } catch (error) {
        console.error('Error fetching initial items:', error);
      }
    },
    async fetchItems() {
      debugger;
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
      await this.fetchItemsInitial(); // Fetch updated items after adding
    },
    async deleteItem(id) {
      const { $firestore } = useNuxtApp();
      await deleteDoc(doc($firestore, 'items', id));
      await this.fetchItemsInitial(); // Fetch updated items after deleting
    },
  },
})