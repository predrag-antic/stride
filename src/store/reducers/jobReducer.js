const initState=[];

const jobReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'CREATE_JOB_SUCCES':            
            console.log("CREATE_JOB_SUCCES")
            return {
                ...state  //treba da se dopuni
            }
        case 'CREATE_JOB_ERROR':
            console.log("CREATE_JOB_ERROR")
            return {
                ...state
            }
        default:
            return state;
    }
    
}

export default jobReducer;