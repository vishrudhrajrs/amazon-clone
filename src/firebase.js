import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB_PifqZ2VUVck0zIv5WhiFGZ-MQoeWAxw",
  authDomain: "clone-bfb39.firebaseapp.com",
  databaseURL: "https://clone-bfb39.firebaseio.com",
  projectId: "clone-bfb39",
  storageBucket: "clone-bfb39.appspot.com",
  messagingSenderId: "202885860116",
  appId: "1:202885860116:web:a44e19ef0b56733f6c1001",
  measurementId: "G-CFB6GSJTL4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
