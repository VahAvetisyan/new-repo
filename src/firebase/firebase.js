import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDPk9kb41F0Tsrxw-33kMx2HjKRzCB6e5o",
  authDomain: "myfirstproject-aca.firebaseapp.com",
  projectId: "myfirstproject-aca",
  storageBucket: "myfirstproject-aca.appspot.com",
  messagingSenderId: "93106682420",
  appId: "1:93106682420:web:eab765967f30698abe6861"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app)
