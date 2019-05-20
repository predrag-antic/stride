import gravatar from 'gravatar'; //We use this in register action!

export const signIn = (credentials) =>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email,credentials.password)
        .then(()=>{
            dispatch({type:'SIGNIN_SUCCES'});
        })
        .catch((error)=>{
            dispatch({type:'SIGNIN_ERROR',error});
        });
    }
}

export const signOut = () =>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        firebase
        .auth()
        .signOut()
        .then(()=>{
            dispatch({type:'SIGNOUT_SUCCES'});
        })
    }
}

export const register= (newUser) => {
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase();
        const firestore=getFirestore();
        firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((user)=>{
            return firestore.collection("profiles").doc(user.user.uid).set({   //ovo je nova kolekcija
                name: newUser.username,
                email: newUser.email,
                avatar: gravatar.url(newUser.email),
                userOrCompany: newUser.userOrCompany
            })
        })
        .then(()=>{
            dispatch({type:"REGISTER_SUCCES"})
        })
        .catch((error)=>{
            dispatch({type:"REGISTER_ERROR",error})
        })
    }
}