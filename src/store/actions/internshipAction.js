export const createInternship= (newInternship) => {
    return(dispatch, getState, {getFirebase, getFirestore})=>{

        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        const uid=getState().firebase.auth.uid;
        const internshipAuthor = getState().firebase.profile;

        firestore
        .collection("internships")
        .add
        ({
            authorId:uid,
            name:profile.name,
            title:newInternship.title,
            description:newInternship.description,
            technology:newInternship.technology,
            duration:newInternship.duration,
            createdAt: new Date().toString(),
            internshipAuthorName: internshipAuthor.companyName
        })
        .then(()=>{
            dispatch({type:"CREATE_INTERNSHIP_SUCCES"})
        })
        .catch((error)=>{
            dispatch({type:"CREATE_INTERNSHIP_ERROR"})
        })
    }
}