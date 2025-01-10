
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyCvjY8G_24WwOU_X2QnqpOk6mBHnhhly5c",
        authDomain: "scentbook-d97e9.firebaseapp.com",
        projectId: "scentbook-d97e9",
        storageBucket: "scentbook-d97e9.firebasestorage.app",
        messagingSenderId: "1023901114380",
        appId: "1:1023901114380:web:6c291d4a56cbe36fef8e29",
    };


    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return {
        provide: {
            firestore: db,
        },
    };
});