export const createJob= (newJob) => {
    return(dispatch,getState,{getFirebase,getFirestore})=>{

        const firestore=getFirestore();
        const uid=getState().firebase.auth.uid;

        firestore
        .collection("jobs")
        .add
        ({
            authorId:uid,
            title:newJob.title,
            description:newJob.description,
            position:newJob.position,
            availablePositions:newJob.availablePosition,
            remote:newJob.remote,
            createdAt: new Date().toString()
        })
        .then(()=>{
            dispatch({type:"CREATE_JOB_SUCCES"})
        })
        .catch((error)=>{
            dispatch({type:"CREATE_JOB_ERROR"})
        })
    }
}
