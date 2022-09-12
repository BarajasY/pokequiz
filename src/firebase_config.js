// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANNTxSed12ohBrhNyhXS_MYuHQYbBudr0",
    authDomain: "pokemonquiz-6aee8.firebaseapp.com",
    projectId: "pokemonquiz-6aee8",
    storageBucket: "pokemonquiz-6aee8.appspot.com",
    messagingSenderId: "576824230431",
    appId: "1:576824230431:web:7426a33e87d4f4f5cd8b2a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);