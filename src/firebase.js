import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBCnEKQO1qx5AU71_Ex-LsSw9qh6Bp1_ao",
  authDomain: "instagram-clone2-2e384.firebaseapp.com",
  projectId: "instagram-clone2-2e384",
  storageBucket: "instagram-clone2-2e384.appspot.com",
  messagingSenderId: "1038124953444",
  appId: "1:1038124953444:web:41ec1eb209de288cdb1471",
  measurementId: "G-55VKD31S5X",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
