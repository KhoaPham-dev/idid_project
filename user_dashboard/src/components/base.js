import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB8iEj0ezfAm76Fmgq4oeiXCuekBFpNfb0",
    authDomain: "online-test-ce024.firebaseapp.com",
    databaseURL: "https://online-test-ce024.firebaseio.com",
    projectId: "online-test-ce024",
    storageBucket: "online-test-ce024.appspot.com",
    messagingSenderId: "466438356099",
    appId: "1:466438356099:web:a9e096f76d51460f89efb6",
    measurementId: "G-1R3Y2TRVQJ"
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
const facebookProvider = new firebase.auth.FacebookAuthProvider()
const googleProvider = new firebase.auth.GoogleAuthProvider();
const db = firebase.database();
export { app, base, facebookProvider, googleProvider, db }