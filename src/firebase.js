import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDrVHtG04gIVnTzjiz0wQBb3dqc-FngfEY",
    authDomain: "facebook-messenger-clone-cf6bb.firebaseapp.com",
    databaseURL: "https://facebook-messenger-clone-cf6bb-default-rtdb.firebaseio.com",
    projectId: "facebook-messenger-clone-cf6bb",
    storageBucket: "facebook-messenger-clone-cf6bb.appspot.com",
    messagingSenderId: "1072296984724",
    appId: "1:1072296984724:web:7be5dac369b968d7fc7481",
    measurementId: "G-0PTRDYGCWZ"
})

const db = firebaseApp.firestore();

export default db;