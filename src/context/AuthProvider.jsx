import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/Firebase.config";
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
     const [myrole, setMyrole] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefecth] = useState(false)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

   const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

      const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth, (cuser)=>{
    setUser(cuser);
    setLoading(false);
  });

  return ()=>{
    unsubscribe();
  };
}, []);


    const authInfo = {
        createUser,
        signIn,
        setRefecth,
        refetch,
        signInWithGoogle,
        signOutUser,
        user,
        updateUserProfile,
        setUser,
        loading,
        setLoading,
        setMyrole,
        myrole
    }

   


    return (
        <AuthContext.Provider value={authInfo}>
          {
         children
          }
            
        </AuthContext.Provider>
       
    );
};

export default AuthProvider