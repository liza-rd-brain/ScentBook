import { useWebsiteStore } from '@/stores/basicStore';
import { Timestamp } from 'firebase/firestore';
import type { NewPerfumeItemType, PerfumeItemType } from '~/types';


export function useItemActions() {
    const store = useWebsiteStore();

    const addItem = async (itemData: NewPerfumeItemType) => {
        const newItem = {
            id: Date.now(),
            ...itemData,
            createdAt: Timestamp.now(),
        };

        await store.addItem({ item: newItem });
    };

    const editItem = async (itemData: PerfumeItemType) => {

        const updatedItem = {
            ...itemData,
            updatedAt: Timestamp.now(),
        };

        await store.editItem({ item: updatedItem });
    };

    const deleteItem = async (itemData: PerfumeItemType) => {
        await store.deleteItem({ item: itemData });
    };


    return {
        addItem,
        editItem,
        deleteItem
    };
}