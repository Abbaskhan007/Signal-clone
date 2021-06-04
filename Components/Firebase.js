import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC_Mi__LTtTPz4sXa-2R05BEt6ailanVxw",
  authDomain: "signal-38c3d.firebaseapp.com",
  projectId: "signal-38c3d",
  storageBucket: "signal-38c3d.appspot.com",
  messagingSenderId: "353664646040",
  appId: "1:353664646040:web:50eac9c59b75eed7a3c9ed",
  measurementId: "G-F4XN6LYPJK",
};

let app;

if(firebase.apps.length == 0){
    app = firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};