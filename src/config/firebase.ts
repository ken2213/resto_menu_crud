// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function FirebaseConfig() {
    const firebaseConfig = {
        apiKey: "AIzaSyBJOhhh-0r1q3gEVRakLALo6deSoW07SNs",
        authDomain: "resto-menu-crud-6efb1.firebaseapp.com",
        databaseURL: "https://resto-menu-crud-6efb1-default-rtdb.firebaseio.com",
        projectId: "resto-menu-crud-6efb1",
        storageBucket: "resto-menu-crud-6efb1.appspot.com",
        messagingSenderId: "2377538269",
        appId: "1:2377538269:web:090bb75fc3294294111934",
        measurementId: "G-KVFJVRXKGV"
    }

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    return getDatabase(app)
}

export default FirebaseConfig;