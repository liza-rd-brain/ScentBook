// plugins/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyCvjY8G_24WwOU_X2QnqpOk6mBHnhhly5c",
        authDomain: "scentbook-d97e9.firebaseapp.com",
        projectId: "scentbook-d97e9",
        storageBucket: "scentbook-d97e9.firebasestorage.app",
        messagingSenderId: "1023901114380",
        appId: "1:1023901114380:web:6c291d4a56cbe36fef8e29",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Provide the Firestore instance to the Nuxt app
    return {
        provide: {
            firestore: db,
        },
    };
});