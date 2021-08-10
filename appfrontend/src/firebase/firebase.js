import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import firebaseFile from "./firebaseFile.json";

firebase.initializeApp(firebaseFile);

const storage = firebase.storage();
const firestore = firebase.firestore();
const currentTime = firebase.firestore.FieldValue.serverTimestamp;

export {storage, firestore, currentTime};