import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAqyRk6hlwGdAW3eHYoehAGvkSkqwJ4ciU",
    authDomain: "catch-of-the-day-9d063.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-9d063.firebaseio.com",
    projectId: "catch-of-the-day-9d063",
    storageBucket: "catch-of-the-day-9d063.appspot.com",
    messagingSenderId: "496097209429"
};

const firebaseApp = firebase.initializeApp(config);
const base = Rebase.createClass(firebaseApp.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();
export { firebaseApp, base, facebookProvider}