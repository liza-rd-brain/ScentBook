import { defineStore } from 'pinia';
import { collection, addDoc, getDocs, getDoc, deleteDoc, doc, query, updateDoc, orderBy, limit, where } from 'firebase/firestore';
import { useNuxtApp } from '#app';


export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    items: [], // Array to store items
    currItem: null
  }),
  actions: {

    setCurrItem(item) {
      this.currItem = item
    },
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
    async editItem({ item }) {
      const { $firestore } = useNuxtApp();

      const q = query(collection($firestore, 'items'), where('id', '==', item.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref; // Get the document reference
        await updateDoc(docRef, item); // Update the document

        await this.fetchItemByCustomId(item.id); // Refresh the local state

      } else {
        console.warn('No such document!');
      }
    },
    async deleteItem({ item }) {
      const { $firestore } = useNuxtApp();

      // Query to find the document with the custom ID
      const q = query(collection($firestore, 'items'), where('id', '==', item.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref; // Get the document reference
        await deleteDoc(docRef); // Delete the document
        await this.fetchItems(); // Refresh the local state

      } else {
        console.warn('No such document!');
      }
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