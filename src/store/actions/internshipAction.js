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
            createdAt: new Date(),
            internshipAuthorName: internshipAuthor.companyName,
            isAvailable:true,
            paid:newInternship.paidInternship
        })
        .then(()=>{
            dispatch({type:"CREATE_INTERNSHIP_SUCCESS"})
        })
        .catch((error)=>{
            dispatch({type:"CREATE_INTERNSHIP_ERROR"})
        })
    }
}

export const updateInternship= (updatedInternship,updatedInternshipId) => {
    return(dispatch, getState, {getFirebase, getFirestore})=>{

        const firestore=getFirestore();
        const companyeName=getState().firebase.profile.name;

        console.log(updatedInternship);
        console.log(updatedInternshipId);

        firestore
        .collection("internships")
        .doc(updatedInternshipId)
        .update    //update internship with this id
        ({
            title:updatedInternship.title,
            description:updatedInternship.description,
            technology:updatedInternship.technology,
            duration:updatedInternship.duration,
            paid:updatedInternship.paidInternship
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
                .collection("myInternshipApplications") //for every doc(profile.id) check if there is myIA collection
                .where("internshipId","==",updatedInternshipId) //always return only one "collection"
                .get()
                .then((myInternships)=>{ 
                    myInternships.docs.map((myapplication)=>{  //myApplication collection -> docs
                        firestore
                        .collection("profiles")
                        .doc(profile.id)   //profiles/{id}/myInternshipApplicaton/{myapplication.id}.SET(UPDATE)
                        .collection("myInternshipApplications")
                        .doc(myapplication.id)
                        .set({ 
                            internshipId:updatedInternshipId,
                            internshipTitle:updatedInternship.title,
                            internshipAuthorName:companyeName,
                            type:"internship"
                        })
                        .then(()=>{
                            dispatch({type:"UPDATE_INTERNSHIP_SUCCESS"})
                        })
                        .catch(()=>{
                            dispatch({type:"UPDATE_INTERNSHIP_ERROR"})
                        })
                    })
                })
            })
        })  
        })
        .catch((error)=>{
            dispatch({type:"UPDATE_INTERNSHIP_ERROR"})
        })
    }
}

export const disableInternship= (internshipId) => {
    return(dispatch, getState, {getFirebase, getFirestore})=>{

        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        const uid=getState().firebase.auth.uid;
        const internshipAuthor = getState().firebase.profile;

        console.log(internshipId);

        firestore
        .collection("internships")
        .doc(internshipId)
        .update
        ({
            isAvailable:false
        })
        .then(()=>{
            dispatch({type:"INTERNSHIP_DISABLE_SUCCESS"})
        })
        .catch((error)=>{
            dispatch({type:"INTERNSHIP_DISABLE_ERROR"})
        })
    }
}