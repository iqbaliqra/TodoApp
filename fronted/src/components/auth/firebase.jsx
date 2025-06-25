
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfZ7zF-M9NzWpe_3D3tIx0qtEzH5EHlZM",
  authDomain: "login-auth-512ec.firebaseapp.com",
  projectId: "login-auth-512ec",
  storageBucket: "login-auth-512ec.appspot.com",
  messagingSenderId: "553308936860",
  appId: "1:553308936860:web:0d8dfad6595c123670ab59",
  measurementId: "G-28PF6CB3RR"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
