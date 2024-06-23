import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgtr5B-IqEVL_yw9_z8i9KpCDvjgV90xc",
  authDomain: "chat-fb-81eec.firebaseapp.com",
  projectId: "chat-fb-81eec",
  storageBucket: "chat-fb-81eec.appspot.com",
  messagingSenderId: "157403408210",
  appId: "1:157403408210:web:62a8606f16bafb524fbc8b",
  measurementId: "G-L2805876G5",
};

const app = firebase.initializeApp(firebaseConfig);

console.log("FIREBASE");

const auth = firebase.auth();
const firestore = firebase.firestore();
let isAuthorised = null;



export const Context = createContext({ app, auth, firestore, isAuthorised });
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider value={{ app, auth, firestore, isAuthorised }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
