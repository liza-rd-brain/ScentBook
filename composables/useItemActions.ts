import { useWebsiteStore } from '@/stores/basicStore';
import { Timestamp } from 'firebase/firestore';

export function useItemActions() {
    const store = useWebsiteStore();

    const addItem = async (itemData: any) => {
        const newItem = {
            id: Date.now(), // Generate a unique ID (you can use a library like `uuid` for better IDs)
            ...itemData,
            createdAt: Timestamp.now(),
        };

        await store.addItem({ item: newItem });
    };

    const editItem = async (itemId: any, itemData: any) => {
        const updatedItem = {
            ...itemData,
            updatedAt: Timestamp.now(),
        };

        await store.editItem({ item: updatedItem });
    };

    return {
        addItem,
        editItem,
    };
}