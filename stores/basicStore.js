import { defineStore } from 'pinia';
import { collection, addDoc, getDocs, getDoc, deleteDoc, doc, query, updateDoc, orderBy, limit, where } from
  'firebase/firestore';
import { useNuxtApp } from '#app';


export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    items: [],
    currItem: null
  }),
  actions: {

    setCurrItem(item) {
      this.currItem = item
    },
    async fetchItemsInitial() {
      const { $firestore } = useNuxtApp();
      try {

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
      const { $firestore } = useNuxtApp();
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

      const { $firestore } = useNuxtApp();
      try {

        const q = query(collection($firestore, 'items'), where('id', '==', Number(customId)));


        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {

          const docSnap = querySnapshot.docs[0];
          this.currItem = {
            id: docSnap.id,
            ...docSnap.data(),
          };
          return item;
        } else {

          console.warn('No such document!');
          return null;
        }
      } catch (error) {
        console.error('Error fetching item:', error);
        return null;
      }
    },
    async addItem({ item }) {
      const { $firestore } = useNuxtApp();
      await addDoc(collection($firestore, 'items'), item);
      await this.fetchItemsInitial();
    },
    async editItem({ item }) {
      const { $firestore } = useNuxtApp();

      const q = query(collection($firestore, 'items'), where('id', '==', item.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, item);

        await this.fetchItemByCustomId(item.id);
      } else {
        console.warn('No such document!');
      }
    },
    async deleteItem({ item }) {
      const { $firestore } = useNuxtApp();

      const q = query(collection($firestore, 'items'), where('id', '==', item.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await deleteDoc(docRef);
        await this.fetchItems();

      } else {
        console.warn('No such document!');
      }
    },
  },
  getters: {
    findItemById: (state) => (itemId) => {
      const existingItem = state.items.find((item) => item.id === itemId);
      if (existingItem) {
        return existingItem;
      } else {
        console.warn('Item not found in store!');
        return null;
      }
    },
  },
})