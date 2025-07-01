import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    // Create new user

    const createUser = (email,password) =>{

        setLoading(true)

            return createUserWithEmailAndPassword(auth,email,password)
        
    }

    //User Login 

    const userLogin = (email,password) =>{

        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }


    // logOut user

    const logOut = () =>{

        setLoading(true);
        return signOut(auth);
    }


      const updateUserProfile = (name, photo) =>{

       return updateProfile(auth.currentUser,{
            displayName:name,photoURL:photo
        })

          
    }


    const userInfo = {

        user,
        setUser,
        loading,
        createUser,
        userLogin,
        logOut,
        updateUserProfile

    }

    // observer 

    useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth,currentUser=>{

        setUser(currentUser);
        setLoading(false);
     })

     return ()=>{

        unsubscribe();
     }

    },[])
    return (
        <AuthContext.Provider value={userInfo}>

            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;