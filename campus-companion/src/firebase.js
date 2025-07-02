// src/firebase.js
// TODO: Replace with your Firebase project config
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyDKIumcEBzOWREaQakx6dK_xV7J1LF_Zgs",
    authDomain: "campus-acf26.firebaseapp.com",
    projectId: "campus-acf26",
    storageBucket: "campus-acf26.appspot.com",
    messagingSenderId: "296818549182",
    appId: "1:296818549182:web:147fadc2980a1ba39059ef",
    measurementId: "G-VB59R16LDN"
  };

const app = initializeApp(firebaseConfig);

export default app; 