/**
 * This is our firebase API
 */
var firebaseConfig = {
    apiKey: "AIzaSyAI2XYfwipMKzMn7accv1VmborqKBg9j_E",
    authDomain: "naturego-e74d6.firebaseapp.com",
    projectId: "naturego-e74d6",
    storageBucket: "naturego-e74d6.appspot.com",
    messagingSenderId: "641465486710",
    appId: "1:641465486710:web:8bb01d58ea9d7136083e57"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var storage = firebase.storage();