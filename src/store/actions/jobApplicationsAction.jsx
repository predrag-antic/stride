export const applyUserToJob= (job,jobId) => {
    return(dispatch, getState, {getFirebase, getFirestore})=>{

        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        const userId=getState().firebase.auth.uid;

        firestore
        .collection("profiles")
        .doc(userId)
        .collection("myJobApplications")
        .add    //random ID for this doc
        ({
            jobId:jobId,
            jobTitle:job.title,
            jobAuthorName: job.jobAuthorName,
            type:"job"
        })
        .then(()=>{
            firestore
            .collection("jobs")
            .doc(jobId)
            .collection("userApplications")
            .add({   //random ID for this doc
                userId:userId,
                userName:profile.name,
                userEmail:profile.email,
                userResumeUrl:profile.resumeUrl
            })
            .then(()=>{
                console.log(jobId);
                dispatch({type:"APPLY_USER_TO_JOB_SUCCES", jobId: jobId})
            })
        })
        .catch((error)=>{
            dispatch({type:"APPLY_USER_TO_JOB_ERROR"})
        })
    }
}

export const getAllMyJobApplications= () => {
    return(dispatch, getState, {getFirebase, getFirestore})=>{

        const firestore=getFirestore();
        const userId=getState().firebase.auth.uid;

        var collectionReference=firestore
        .collection("profiles")
        .doc(userId)
        .collection("myJobApplications");

        collectionReference
        .get()
        .then((snapshot)=>{
            var jobsId=[];
            snapshot.docs.map((job)=>{
                console.log(job.data().jobId);
                jobsId.push(job.data().jobId);
            })
            dispatch({type:"GET_ALL_MY_JOB_APPLICATIONS_SUCCESS",jobsId:jobsId})
        })
        .catch(()=>{
            dispatch({type:"GET_ALL_MY_JOB_APPLICATIONS_ERROR"})
        })
    }
}