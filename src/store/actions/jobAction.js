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
            technology:newJob.technology,
            availablePositions:newJob.availablePosition,
            city:newJob.city,
            remote:newJob.remote,
            createdAt: new Date(),
            jobAuthorName: jobAuthor.companyName,
            isAvailable: true
        })
        .then(()=>{
            dispatch({type:"CREATE_JOB_SUCCESS"})
        })
        .catch((error)=>{
            dispatch({type:"CREATE_JOB_ERROR"})
        })
    }
}

export const updateJob= (updatedJob,updatedJobId) => {
    return(dispatch, getState, {getFirebase, getFirestore})=>{

        const firestore=getFirestore();
        const companyName=getState().firebase.profile.name;

        firestore
        .collection("jobs")
        .doc(updatedJobId)
        .update    //update job with this id
        ({
            title:updatedJob.title,
            description:updatedJob.description,
            position:updatedJob.position,
            technology:updatedJob.technology,
            availablePositions:updatedJob.availablePosition,
            remote: updatedJob.remote,
            city: updatedJob.city
        })
        .then(()=>{   //this part is for updating all users 

        firestore
        .collection("profiles")
        .get()
        .then((profilesSnapShot)=>{
            profilesSnapShot.docs.map((profile)=>{
                firestore
                .collection("profiles")
                .doc(profile.id)
                .collection("myJobApplications") //for every doc(profile.id) check if there is myIA collection
                .where("jobId","==",updatedJobId) //always return only one "collection"
                .get()
                .then((myJobs)=>{ 
                    myJobs.docs.map((myapplication)=>{  //myApplication collection -> docs
                        firestore
                        .collection("profiles")
                        .doc(profile.id)   //profiles/{id}/myInternshipApplicaton/{myapplication.id}.SET(UPDATE)
                        .collection("myJobApplications")
                        .doc(myapplication.id)
                        .set({ 
                            jobId:updatedJobId,
                            jobTitle:updatedJob.title,
                            jobAuthorName:companyName,
                            type:"job"
                        })
                        .then(()=>{
                            dispatch({type:"UPDATE_JOB_SUCCESS"})
                        })
                        .catch(()=>{
                            dispatch({type:"UPDATE_JOB_ERROR"})
                        })
                    })
                })
            })
        })  
        })
        .catch((error)=>{
            dispatch({type:"UPDATE_JOB_ERROR"})
        })
    }
}

export const disableJob= (jobId) => {
    return(dispatch, getState, {getFirebase, getFirestore})=>{

        const firestore=getFirestore();

        firestore
        .collection("jobs")
        .doc(jobId)
        .update
        ({
            isAvailable:false
        })
        .then(()=>{
            dispatch({type:"JOB_DISABLE_SUCCESS"})
        })
        .catch((error)=>{
            dispatch({type:"JOB_DISABLE_ERROR"})
        })
    }
}