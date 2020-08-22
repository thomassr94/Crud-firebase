import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAT6gl9dv_GVcOyhyyvLte422U-4bDH_KQ",
    authDomain: "crud-react-c6f7d.firebaseapp.com",
    databaseURL: "https://crud-react-c6f7d.firebaseio.com",
    projectId: "crud-react-c6f7d",
    storageBucket: "crud-react-c6f7d.appspot.com",
    messagingSenderId: "1011786447242",
    appId: "1:1011786447242:web:887d2f8858379cffa7b073"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export {firebase};