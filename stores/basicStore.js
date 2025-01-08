import { defineStore } from 'pinia';
import { collection, addDoc, getDocs, getDoc, deleteDoc, doc, query, orderBy, limit, where } from 'firebase/firestore';
import { useNuxtApp } from '#app';

export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    items: [], // Array to store items
    currItem: null
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

      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    async fetchItemByCustomId(customId) {

      const { $firestore } = useNuxtApp(); // Access the Firestore instance
      try {
        // Create a query to find the document with the custom `id` field
        const q = query(collection($firestore, 'items'), where('id', '==', Number(customId)));

        // Execute the query
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // If the document exists, return its data
          const docSnap = querySnapshot.docs[0]; // Get the first matching document
          this.currItem = {
            id: docSnap.id, // Firestore document ID
            ...docSnap.data(), // Document data
          };
          return item;
        } else {
          // If no document matches the query, log a warning and return null
          console.warn('No such document!');
          return null;
        }
      } catch (error) {
        console.error('Error fetching item:', error);
        return null;
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
  getters: {
    // Find an item by ID in the store
    findItemById: (state) => (itemId) => {
      const existingItem = state.items.find((item) => item.id === itemId);
      if (existingItem) {
        return existingItem;
      } else {
        console.warn('Item not found in store!'); // Debugging: Log if item is not found
        return null;
      }
    },
  },
})