export const setJobFilter= (position,technology) => {
    return(dispatch,getState,{getFirebase,getFirestore})=>{

        dispatch({type:"JOB_FILTER_SUCCESS",position:position,technology:technology})

    }
}
