

const initState=[];

const internshipApplicationReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'APPLY_USER_TO_INTERNSHIP_SUCCES':            
            return [...state,action.internshipId]
        case 'APPLY_USER_TO_INTERNSHIP_ERROR':
            return state;
        case 'GET_ALL_MY_INTERNSHIP_APPLICATIONS_SUCCESS':
            return action.internshipsId
        case 'GET_ALL_MY_INTERNSHIP_APPLICATIONS_ERROR':
            return state;
        default:
            return state;
        }
        
    }

export default internshipApplicationReducer;