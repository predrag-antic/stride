const initState=[];

const jobReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'CREATE_JOB_SUCCESS':            
            console.log("CREATE_JOB_SUCCESS")
            return {
                ...state  //treba da se dopuni
            }
        case 'CREATE_JOB_ERROR':
            console.log("CREATE_JOB_ERROR")
            return {
                ...state
            }
        case 'UPDATE_JOB_SUCCESS':
            console.log("UPDATE_JOB_SUCCESS");
            return {
                state
            }
        case 'UPDATE_JOB_ERROR':
            console.log("UPDATE_JOB_ERROR");
            return {
                state
            }
        case 'JOB_DISABLE_SUCCESS':
            console.log("JOB_DISABLE_SUCCESS");
            return {
                state
            }
        case 'JOB_DISABLE_ERROR':
            console.log("JOB_DISABLE_ERROR");
            return {
                 state
        }
        default:
            return state;
    }
    
}

export default jobReducer;