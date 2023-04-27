import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCO2fI7rsCCL9ify9TpeG1YdeOlhIpa1fg",
  authDomain: "aca-project-35029.firebaseapp.com",
  projectId: "aca-project-35029",
  storageBucket: "aca-project-35029.appspot.com",
  messagingSenderId: "405437286231",
  appId: "1:405437286231:web:9ce288d0e5234038b7e012",
  measurementId: "G-DQ3G65G693"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app)
