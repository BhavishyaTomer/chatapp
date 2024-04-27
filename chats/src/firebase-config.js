import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAGzXSGGgPV6VM6Bloy8cbXCw7HelqfOdM",
    authDomain: "chat-app-beaa6.firebaseapp.com",
    projectId: "chat-app-beaa6",
    storageBucket: "chat-app-beaa6.appspot.com",
    messagingSenderId: "1394035476",
    appId: "1:1394035476:web:bee9e035c7db348c425001",
    measurementId: "G-9MLHDE7757"
  };


  const app = initializeApp(firebaseConfig);
 export const firebaseauth = getAuth(app);