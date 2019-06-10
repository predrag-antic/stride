export const setProjectFilter= (technology) => {
    return(dispatch,getState,{getFirebase,getFirestore})=>{

        dispatch({type:"PROJECT_FILTER_SUCCESS",technology:technology})

    }
}
