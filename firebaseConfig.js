import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { signInWithPopup,getAuth,GoogleAuthProvider  } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyC69ilp2thQqjlHJaXpeUKTDRaIn8wewXo",
  authDomain: "fir-testproject-7487e.firebaseapp.com",
  projectId: "fir-testproject-7487e",
  storageBucket: "fir-testproject-7487e.appspot.com",
  messagingSenderId: "1013941129939",
  appId: "1:1013941129939:web:9f5bfccec3ccc27ab83a26"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export function singInWithGoogle(){
  signInWithPopup(auth,provider).then((result) =>{
    console.log("login successfully",result);
  })
  .catch((err)=>{
    console.log("login with google",err);
  })
}

export const auth = getAuth(app);
export const db = getFirestore(app)