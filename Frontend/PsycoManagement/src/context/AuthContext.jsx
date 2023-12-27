/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { auth } from "../api/firebase.config";


export const AuthTherapist = createContext();

export const AuthContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    

    const SignUp = ( email, password ) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const SignIn = ( email, password) => {
        const data = signInWithEmailAndPassword(auth, email, password);
        return data;
    }

    const SignOut = () => {
        return signOut(auth);
        
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged( auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);


    return <AuthTherapist.Provider value={{ user, SignUp, SignIn, SignOut }}>{children}</AuthTherapist.Provider>
}

export const TherapistAuth = () => {
    return useContext(AuthTherapist);
}

