import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDvuROeL2e-CNus2r8cBm3hRI_6gEA-NKA",
  authDomain: "crud-react-254ff.firebaseapp.com",
  projectId: "crud-react-254ff",
  storageBucket: "crud-react-254ff.appspot.com",
  messagingSenderId: "136941456397",
  appId: "1:136941456397:web:ad0105605c28d44fc95944",
  measurementId: "G-92BRK83KXW"
};


const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
