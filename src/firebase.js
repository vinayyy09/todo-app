// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYDGNEa22Nm_HyTrViZ-NqGZK18hY2goU",
  authDomain: "todo-app-26062.firebaseapp.com",
  projectId: "todo-app-26062",
  storageBucket: "todo-app-26062.appspot.com",
  messagingSenderId: "75136752159",
  appId: "1:75136752159:web:1f6144f27880ba428d932a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
