export const applyToProject= (project,projectId) => {
    return(dispatch, getState, {getFirebase, getFirestore})=>{

        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        const userId=getState().firebase.auth.uid;

        firestore
        .collection("profiles")
        .doc(userId)
        .collection("myProjectApplications")
        .add    //random ID for this doc
        ({
            projectId: projectId,
            projectTitle:project.title,
            projectAuthorName:project.projectAuthorName,
            type:"project"
        })
        .then(()=>{
            firestore
            .collection("projects")
            .doc(projectId)
            .collection("userApplications")
            .add({   //random ID for this doc
                userId:userId,
                userName:profile.name,
                userEmail:profile.email
            })
            .then(()=>{
                console.log(projectId);
                dispatch({type:"APPLY_USER_TO_PROJECT_SUCCES",projectId:projectId})
            })
        })
        .catch((error)=>{
            dispatch({type:"APPLY_USER_TO_PROJECT_ERROR"})
        })
    }
}

export const getAllMyProjectApplications= () => {
    return(dispatch, getState, {getFirebase, getFirestore})=>{

        const firestore=getFirestore();
        const userId=getState().firebase.auth.uid;

        var collectionReference=firestore
        .collection("profiles")
        .doc(userId)
        .collection("myProjectApplications");

        collectionReference
        .get()
        .then((snapshot)=>{
            var projectsId=[];
            snapshot.docs.map((project)=>{
                console.log(project.data().projectId);
                projectsId.push(project.data().projectId);
            })
            dispatch({type:"GET_ALL_MY_PROJECT_APPLICATIONS_SUCCESS",projectsId:projectsId})
        })
        .catch(()=>{
            dispatch({type:"GET_ALL_MY_PROJECT_APPLICATIONS_ERROR"})
        })
    }
}


