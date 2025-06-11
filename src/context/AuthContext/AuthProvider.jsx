import React, { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import axios from "axios";
const googleProvider = new GoogleAuthProvider
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme || (systemPrefersDark ? 'dark' : 'light');
    });
    useEffect(() => {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const updateUser = (data) => {
        return updateProfile(auth.currentUser, data)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
            //From Client Side3 send the Information To generate token
            if (currentUser?.email) {
                const userData = { email: currentUser.email }
                axios.post('http://localhost:5000/jwt', userData,
                    {
                        withCredentials: true
                    }
                ).then(res => {
                    // console.log(res.data)
                }).catch(error => console.log(error))
            }
            console.log(currentUser.accessToken)
        })
        return () => {
            unSubscribe()
        }
    }, [])
    const resetPass = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }
    const AuthInfo = {
        createUser,
        loading,
        setLoading,
        signInUser,
        user,
        logOut, updateUser, resetPass, signInWithGoogle, theme,
        toggleTheme,
    }
    return <AuthContext value={AuthInfo}>
        {children}
    </AuthContext>
}
export default AuthProvider