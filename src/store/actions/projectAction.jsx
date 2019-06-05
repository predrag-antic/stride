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
        })
        .then(()=>{
            dispatch({type:"CREATE_PROJECT_SUCCES"})
        })
        .catch((error)=>{
            dispatch({type:"CREATE_PROJECT_ERROR"})
        })
    }
}
