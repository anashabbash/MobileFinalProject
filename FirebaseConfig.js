import * as firebase from 'firebase';
import '@firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyCWT4k9eSaA2V_7EGycB3lfv-mDvQG4FXY",
    authDomain: "mobilefinalproject-4d5ba.firebaseapp.com",
    databaseURL: "https://mobilefinalproject-4d5ba.firebaseio.com",
    projectId: "mobilefinalproject-4d5ba",
    storageBucket: "mobilefinalproject-4d5ba.appspot.com",
    messagingSenderId: "691455632604",
    appId: "1:691455632604:web:e821600de556aa18dd4019",
    measurementId: "G-3SEGJQWLNH"
  };
let app = firebase.initializeApp(firebaseConfig);

export const db = app.database();
export const firestore = firebase.firestore(app);
export const auth = app.auth();