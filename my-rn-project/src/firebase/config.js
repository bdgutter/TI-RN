import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCMOKNvuxxLXKraOz66r9LOL7xHcmydjhE",
    authDomain: "tiprogramacioniii.firebaseapp.com",
    projectId: "tiprogramacioniii",
    storageBucket: "tiprogramacioniii.firebasestorage.app",
    messagingSenderId: "103313694097",
    appId: "1:103313694097:web:85e9bd509102aab9234e30"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();