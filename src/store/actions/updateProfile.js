export const updateProfile=()=>{
    return (dispatch,getState,{getFirestore})=>{
        
        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        const uid=getState().firebase.auth.uid;

        console.log("Profile uid: "+uid);

        if(profile.userOrCompany==="User"){
            console.log("USER UPDATE");
            firestore
            .collection("profiles")
            .doc(uid)
            .set({
                avatar:profile.avatar,
                email:profile.email,
                firstAccess:false,
                name:profile.name,
                userOrCompany:profile.userOrCompany
            })
            .then(()=>{
                dispatch({type:"UPDATE_USER_SUCCES"})
            })
            .catch((error)=>{
                dispatch({type:"UPDATE_ERROR"})
            })
        }else{
            console.log("COMPANY UPDATE");
            firestore
            .collection("profiles")
            .doc(uid)
            .set({
                avatar:profile.avatar,
                email:profile.email,
                firstAccess:false,
                name:profile.name,
                userOrCompany:profile.userOrCompany
            })
            .then(()=>{
                dispatch({type:"UPDATE_COMPANY_SUCCES"})
            })
            .catch((error)=>{
                dispatch({type:"UPDATE_ERROR"})
            })
        }
    }
}