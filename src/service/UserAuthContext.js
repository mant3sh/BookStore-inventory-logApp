import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase-config";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function Login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function Logout() {
    return signOut(auth);
  }
  function googlesignin() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (curruser) => {
      setUser(curruser);
    });
  }, [user]);

  return (
    <userAuthContext.Provider
      value={{ user, signUp, Login, Logout, googlesignin }}
    >
      {children}
    </userAuthContext.Provider>
  );
}
export function useUserAuth() {
  return useContext(userAuthContext);
}
