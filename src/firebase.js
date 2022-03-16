// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyDFc6lfHOaMmSPlSDksxQkvjFLemPa2xgU",
   authDomain: "solspot-web3.firebaseapp.com",
   projectId: "solspot-web3",
   storageBucket: "solspot-web3.appspot.com",
   messagingSenderId: "1061650747855",
   appId: "1:1061650747855:web:4a15646a3e44b10a6b82ba",
   measurementId: "G-YQET1F0QWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);