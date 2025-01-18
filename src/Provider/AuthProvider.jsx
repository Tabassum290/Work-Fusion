import { createUserWithEmailAndPassword, 
    onAuthStateChanged, signInWithEmailAndPassword,
     signOut, updateProfile, GoogleAuthProvider,  
     signInWithPopup,
     GithubAuthProvider} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import { auth } from "../firebase";

export const AuthContext = createContext(null);
const gitProvider = new GithubAuthProvider();
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const axiosPublic = UseAxiosPublic()

    const createNewUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

const LoginUser = (email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
}

const profileUpdate = (name,photo)=>{
    console.log("Updating profile with name:", name, "and photo:", photo);
 return  updateProfile(auth.currentUser,{
        displayName:name,photoURL:photo
    })
}


const googleProvider =()=>{
    return signInWithPopup(auth,provider);
}

const signInWithGitHub =() => {
   return signInWithPopup(auth, gitProvider);
  };

useEffect(()=>{
    const unSubscribe = onAuthStateChanged( auth,currentUser =>{
        setUser(currentUser);
        if(currentUser){
            const userInfo = {email:currentUser.email}
            axiosPublic.post('/jwt',userInfo)
            .then(res=> {
                if(res.data.token){
                    localStorage.setItem('access-token',res.data.token);
                    setLoading(false);
                }
            })
        }else{
            localStorage.removeItem('access-token');
            setLoading(false);
        }

})
return ()=>{
return unSubscribe();
}

},[axiosPublic])

const logOut = ()=>{
    return signOut(auth);
}

const authInfo ={
    user,profileUpdate,googleProvider,signInWithGitHub,
    createNewUser,loading,setLoading,setUser,LoginUser,logOut,
}
    return (
<AuthContext.Provider value={authInfo}>
    {children}
</AuthContext.Provider>
    );
};

export default AuthProvider;