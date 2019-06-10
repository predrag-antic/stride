const initState=[];
const projectReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'CREATE_PROJECT_SUCCES':            
            return {
                ...state  //treba da se dopuni
            }
        case 'CREATE_PROJECT_ERROR':
            return {
                ...state
            }
        case 'UPDATE_PROJECT_SUCCESS':
                return {
                    state
                    }
        case 'UPDATE_PROJECT_ERROR':
            return {
                state
            }
        case 'PROJECT_DISABLE_SUCCESS':
            return {
                state
            }
        case 'PROJECT_DISABLE_ERROR':
                return {
                    state
                }
        default:
            return state;
    }
}

export default projectReducer;