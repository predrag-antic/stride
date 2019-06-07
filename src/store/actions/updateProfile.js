export const updateProfile=(profileInfo)=>{
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
                avatarUrl: profileInfo.avatarUrl,
                email: profile.email,
                firstAccess: false,
                name: profile.name,
                userOrCompany: profile.userOrCompany,
                userName: profileInfo.userName,
                fullname: profileInfo.fullname,
                eMail: profileInfo.eMail,
                city: profileInfo.city,
                address: profileInfo.address,
                country: profileInfo.country,
                postcode: profileInfo.postcode,
                informations: profileInfo.informations,
                resume: profileInfo.resume,
                resumeUrl: profileInfo.resumeUrl

            })
            .then(()=>{
                dispatch({type:"UPDATE_USER_SUCCES"})
            })
            .catch((error)=>{
                dispatch({type:"UPDATE_USER_ERROR"})
            })
        }
        else{
            console.log("COMPANY UPDATE");
            firestore
            .collection("profiles")
            .doc(uid)
            .set({
                avatar:profile.avatar,
                avatarUrl:profileInfo.avatarUrl,
                email:profile.email,
                firstAccess:false,
                name:profile.name,
                userOrCompany:profile.userOrCompany,
                userName: profileInfo.userName,
                companyName: profileInfo.companyName,
                founded: profileInfo.founded,
                headquarters: profileInfo.headquarters,
                eMail: profileInfo.eMail,
                phoneNumber: profileInfo.phoneNumber,
                website: profileInfo.website,
                aboutUs: profileInfo.aboutUs,
                numOfEmployees: profileInfo.numOfEmployees
            })
            .then(()=>{
                dispatch({type:"UPDATE_COMPANY_SUCCES"})
            })
            .catch((error)=>{
                dispatch({type:"UPDATE_COMPANY_ERROR"})
            })
        }
    }
}