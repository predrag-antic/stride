export const setProjectFilter= (technology) => {
    return(dispatch,getState,{getFirebase,getFirestore})=>{

        console.log(technology);
        dispatch({type:"PROJECT_FILTER_SUCCESS",technology:technology})

    }
}
