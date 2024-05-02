// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, browserLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqnMlVITzdiAaKIfvPj7FM9h_C82lTzgA",
  authDomain: "mapp-32c9c.firebaseapp.com",
  projectId: "mapp-32c9c",
  storageBucket: "mapp-32c9c.appspot.com",
  messagingSenderId: "52158021527",
  appId: "1:52158021527:web:6c1c2b07f116c5921d8ed2",
  measurementId: "G-2KWWSXP7D8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
auth.setPersistence(browserLocalPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

export { firebaseApp , auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup}