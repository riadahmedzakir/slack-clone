import firebase from "firebase";

import 'firebase/analytics';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDVs8ZbX5mSHcDonfm9aFwxnuBBQgn54Pg",
    authDomain: "react-slack-24c40.firebaseapp.com",
    projectId: "react-slack-24c40",
    storageBucket: "react-slack-24c40.appspot.com",
    messagingSenderId: "428423241774",
    appId: "1:428423241774:web:e1da556171031d9ad1ffbf",
    measurementId: "G-8T8NPL74F6",
    databaseURL: "https://react-slack-24c40-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;