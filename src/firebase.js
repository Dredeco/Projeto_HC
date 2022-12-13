import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxvvagnhA5MpmKdWIfdXglMiD718HIJP8",
  authDomain: "coins-ea5a9.firebaseapp.com",
  projectId: "coins-ea5a9",
  storageBucket: "coins-ea5a9.appspot.com",
  messagingSenderId: "1080187908050",
  appId: "1:1080187908050:web:9e42fcf397ef0d4ce6220b"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}