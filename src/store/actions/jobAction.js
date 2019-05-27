export const createJob= (newJob) => {
    return(dispatch,getState,{getFirebase,getFirestore})=>{

        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        const uid=getState().firebase.auth.uid;

        firestore
        .collection("jobs")
        .add
        ({
            authorId:uid,
            name:profile.name,
            title:newJob.title,
            description:newJob.description,
            position:newJob.position,
            availablePositions:newJob.availablePosition,
            remote:newJob.remote
        })
        .then(()=>{
            dispatch({type:"CREATE_JOB_SUCCES"})
        })
        .catch((error)=>{
            dispatch({type:"CREATE_JOB_ERROR"})
        })
    }
}