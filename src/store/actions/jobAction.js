export const createJob= (newJob) => {
    return(dispatch,getState,{getFirebase,getFirestore})=>{

        const firestore=getFirestore();
        const uid=getState().firebase.auth.uid;
        const jobAuthor = getState().firebase.profile;

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
            createdAt: new Date().toString(),
            jobAuthorName: jobAuthor.companyName
        })
        .then(()=>{
            dispatch({type:"CREATE_JOB_SUCCES"})
        })
        .catch((error)=>{
            dispatch({type:"CREATE_JOB_ERROR"})
        })
    }
}
