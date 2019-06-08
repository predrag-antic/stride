export const applyUserToInternship= (internship,internshipId) => {
    return(dispatch, getState, {getFirebase, getFirestore})=>{

        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        const userId=getState().firebase.auth.uid;

        firestore
        .collection("profiles")
        .doc(userId)
        .collection("myInternshipApplications")
        .add    //random ID for this doc
        ({
            internshipId:internshipId,
            internshipTitle:internship.title,
            internshipAuthorName:internship.name,
            type:"internship"
        })
        .then(()=>{
            firestore
            .collection("internships")
            .doc(internshipId)
            .collection("userApplications")
            .add({   //random ID for this doc
                userId:userId,
                userName:profile.name,
                userEmail:profile.email,
                userResumeUrl:profile.resumeUrl
            })
            .then(()=>{
                console.log(internshipId);
                dispatch({type:"APPLY_USER_TO_INTERNSHIP_SUCCES",internshipId:internshipId})
            })
        })
        .catch((error)=>{
            dispatch({type:"APPLY_USER_TO_INTERNSHIP_ERROR"})
        })
    }
}

export const getAllMyInternshipApplications= () => {
    return(dispatch, getState, {getFirebase, getFirestore})=>{

        const firestore=getFirestore();
        const userId=getState().firebase.auth.uid;

        var collectionReference=firestore
        .collection("profiles")
        .doc(userId)
        .collection("myInternshipApplications");

        collectionReference
        .get()
        .then((snapshot)=>{
            var internshipsId=[];
            snapshot.docs.map((internship)=>{
                console.log(internship.data().internshipId);
                internshipsId.push(internship.data().internshipId);
            })
            dispatch({type:"GET_ALL_MY_INTERNSHIP_APPLICATIONS_SUCCESS",internshipsId:internshipsId})
        })
        .catch(()=>{
            dispatch({type:"GET_ALL_MY_INTERNSHIP_APPLICATIONS_ERROR"})
        })
    }
}