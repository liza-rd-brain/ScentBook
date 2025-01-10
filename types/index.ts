import type { Timestamp } from 'firebase/firestore';

export type NewPerfumeItemType = {
    name: null;
    brand: null;
    fragranceFamily: null;
    mainAccords: null;
    perfumer: null;
    link: null;
    terms: boolean;
    createdAt: Timestamp;
    updatedAt?: Timestamp;
}
export type PerfumeItemType = NewPerfumeItemType & {
    id: string;

}   