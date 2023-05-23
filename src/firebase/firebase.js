import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBQaFCK0NjWwXpfivNfFaMKMVuw5HnGDPQ",
  authDomain: "cinema-asd.firebaseapp.com",
  projectId: "cinema-asd",
  storageBucket: "cinema-asd.appspot.com",
  messagingSenderId: "524411377279",
  appId: "1:524411377279:web:bffa92b87d190dc802114a",
  measurementId: "G-R7DDQK43GL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app)
