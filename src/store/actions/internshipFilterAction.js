export const setInternshipFilter= (filter) => {
    return(dispatch,getState,{getFirebase,getFirestore})=>{

        console.log(filter.internshipTechnology," ",filter.internshipDuration,"",filter.internshipPaid);
        dispatch({
            type:"INTERNSHIP_FILTER_SUCCESS",
            technology:filter.internshipTechnology,
            duration:filter.internshipDuration,
            paid:filter.internshipPaid
        })

    }
}
