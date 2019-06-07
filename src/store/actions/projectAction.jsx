export const createProject= (newProject) => {
    return(dispatch,getState,{getFirebase,getFirestore})=>{

        const firestore=getFirestore();
        const uid=getState().firebase.auth.uid;
        const projectAuthor = getState().firebase.profile;

        firestore
        .collection("projects")
        .add
        ({
            authorId:uid,
            title:newProject.title,
            description:newProject.description,
            technology:newProject.technology,
            duration:newProject.duration,
            createdAt: new Date(),
            projectAuthorName: projectAuthor.userName
        })
        .then(()=>{
            dispatch({type:"CREATE_PROJECT_SUCCES"})
        })
        .catch((error)=>{
            dispatch({type:"CREATE_PROJECT_ERROR"})
        })
    }
}

export const updateProject= (updatedProject,updatedProjectId) => {
    return(dispatch, getState, {getFirebase, getFirestore})=>{

        const firestore=getFirestore();
        const userName=getState().firebase.profile.name;

        console.log(updatedProject);
        console.log(updatedProjectId);

        firestore
        .collection("projects")
        .doc(updatedProjectId)
        .update    //update project with this id
        ({
            title:updatedProject.title,
            description:updatedProject.description,
            technology:updatedProject.technology,
            duration:updatedProject.duration
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
                .collection("myProjectApplications") //for every doc(profile.id) check if there is myIA collection
                .where("projectId","==",updatedProjectId) //always return only one "collection"
                .get()
                .then((myProjects)=>{ 
                    myProjects.docs.map((myapplication)=>{  //myApplication collection -> docs
                        firestore
                        .collection("profiles")
                        .doc(profile.id)   //profiles/{id}/myInternshipApplicaton/{myapplication.id}.SET(UPDATE)
                        .collection("myProjectApplications")
                        .doc(myapplication.id)
                        .set({ 
                            projectId:updatedProjectId,
                            projectTitle:updatedProject.title,
                            projectAuthorName:userName,
                            type:"project"
                        })
                        .then(()=>{
                            dispatch({type:"UPDATE_PROJECT_SUCCESS"})
                        })
                        .catch(()=>{
                            dispatch({type:"UPDATE_PROJECT_ERROR"})
                        })
                    })
                })
            })
        })  
        })
        .catch((error)=>{
            dispatch({type:"UPDATE_PROJECT_ERROR"})
        })
    }
}

export const disableProject= (projectId) => {
    return(dispatch, getState, {getFirebase, getFirestore})=>{

        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        const uid=getState().firebase.auth.uid;
        const projectAuthorName = getState().firebase.profile;

        console.log(projectId);

        firestore
        .collection("projects")
        .doc(projectId)
        .update
        ({
            isAvailable:false
        })
        .then(()=>{
            dispatch({type:"PROJECT_DISABLE_SUCCESS"})
        })
        .catch((error)=>{
            dispatch({type:"PROJECT_DISABLE_ERROR"})
        })
    }
}