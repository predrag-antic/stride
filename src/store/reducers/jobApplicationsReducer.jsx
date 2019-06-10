

const initState=[];

const jobApplicationReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'APPLY_USER_TO_JOB_SUCCES':            
            return [...state,action.jobId]
        case 'APPLY_USER_TO_JOB_ERROR':
            return state;
        case 'GET_ALL_MY_JOB_APPLICATIONS_SUCCESS':
            return action.jobsId
        case 'GET_ALL_MY_JOB_APPLICATIONS_ERROR':
            return state;
        default:
            return state;
        }
        
    }

export default jobApplicationReducer;