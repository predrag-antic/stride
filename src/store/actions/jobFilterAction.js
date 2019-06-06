export const setJobFilter= (position,technology) => {
    return(dispatch,getState,{getFirebase,getFirestore})=>{

        console.log(position," ",technology);
        dispatch({type:"JOB_FILTER_SUCCESS",position:position,technology:technology})

    }
}
