// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import NEXT_PUBLIC_FIREBASE_API_KEY from "../src/firebase.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "instapost-a93cc.firebaseapp.com",
  projectId: "instapost-a93cc",
  storageBucket: "instapost-a93cc.appspot.com",
  messagingSenderId: "913367371860",
  appId: "1:913367371860:web:2a9cf244ff97532c4bddc1"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);


// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read;
//         allow write: if request.resource.size<2*1024*1024 && request.resource.contentType.matches("images/.*")
//       }
//     }
//   }