const initState=[];

const projectApplicationReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'APPLY_USER_TO_PROJECT_SUCCES':            
            console.log("APPLY_USER_TO_PROJECT_SUCCES")
            return [...state,action.projectId]
        case 'APPLY_USER_TO_PROJECT_ERROR':
            console.log("APPLY_USER_TO_PROJECT_ERROR")
            return state;
        case 'GET_ALL_MY_PROJECT_APPLICATIONS_SUCCESS':
            console.log("GET_ALL_MY_PROJECT_APPLICATIONS_SUCCESS")
            return action.projectsId
        case 'GET_ALL_MY_PROJECT_APPLICATIONS_ERROR':
            console.log("GET_ALL_MY_PROJECT_APPLICATIONS_ERROR")
            return state;
        default:
            return state;
        }

    }

export default projectApplicationReducer;