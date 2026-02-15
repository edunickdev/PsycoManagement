import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz...", // I should probably check if there's a reference or use placeholders if not sure
  authDomain: "psycomanagement-6e6e2.firebaseapp.com",
  projectId: "psycomanagement-6e6e2",
  storageBucket: "psycomanagement-6e6e2.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
