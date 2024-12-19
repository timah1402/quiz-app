// Import Firebase modules
// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore'; // Importer Firestore

// Configuration de votre Firebase (remplacez ces valeurs par celles de votre projet)

const firebaseConfig = {
    apiKey: "AIzaSyDzTXvbq8ftKAz8XhnkuwqM3HShMGg3ypk",
    authDomain: "webdevfinal-9f139.firebaseapp.com",
    projectId: "webdevfinal-9f139",
    storageBucket: "webdevfinal-9f139.firebasestorage.app",
    messagingSenderId: "779894567077",
    appId: "1:779894567077:web:b9e138a69e08830b4f9d4c",
    measurementId: "G-X7PG6075JR"
  }
// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firebase Auth
const auth = getAuth(app);

// Initialisation de Firestore
const db = getFirestore(app); // Initialiser Firestore ici

// Export des objets nécessaires
export { auth, db }; // Exporter db pour l'utiliser ailleurs


;