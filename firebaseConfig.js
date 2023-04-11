import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDV9TF3yepBRqWUgK2GTI-4V7eXyb9l8do",
    authDomain: "agri-fm.firebaseapp.com",
    databaseURL: "https://agri-fm-default-rtdb.firebaseio.com",
    projectId: "agri-fm",
    storageBucket: "agri-fm.appspot.com",
    messagingSenderId: "231936972927",
    appId: "1:231936972927:web:a4a298ebd4060a6792874a"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default database;