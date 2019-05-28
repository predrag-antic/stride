export const updateProfile=(companyInfo)=>{
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
        }
        else{
            console.log("COMPANY UPDATE");
            firestore
            .collection("profiles")
            .doc(uid)
            .set({
                avatar:profile.avatar,
                email:profile.email,
                firstAccess:false,
                name:profile.name,
                userOrCompany:profile.userOrCompany,
                companyName: companyInfo.companyName,
                established: companyInfo.established,
                address: companyInfo.address,
                eMail: companyInfo.eMail,
                phoneNumber: companyInfo.phoneNumber,
                website: companyInfo.website
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