const initState=[];

const jobReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'CREATE_JOB_SUCCESS':            
            return {
                ...state  //treba da se dopuni
            }
        case 'CREATE_JOB_ERROR':
            return {
                ...state
            }
        case 'UPDATE_JOB_SUCCESS':
            return {
                state
            }
        case 'UPDATE_JOB_ERROR':
            return {
                state
            }
        case 'JOB_DISABLE_SUCCESS':
            return {
                state
            }
        case 'JOB_DISABLE_ERROR':
            return {
                 state
        }
        default:
            return state;
    }
    
}

export default jobReducer;