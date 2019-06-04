const initState={
    internships:[

    ]
}

const internshipReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'CREATE_INTERNSHIP_SUCCESS':            
            console.log("CREATE_INTERNSHIP_SUCCESS")
            return {
                state  
            }
        case 'CREATE_INTERNSHIP_ERROR':
            console.log("CREATE_INTERNSHIP_ERROR")
            return {
                state
            }
        case 'UPDATE_INTERNSHIP_SUCCESS':
                console.log("UPDATE_INTERNSHIP_SUCCESS");
                return {
                    state
                    }
        case 'UPDATE_INTERNSHIP_ERROR':
            console.log("UPDATE_INTERNSHIP_ERROR");
            return {
                state
            }
        case 'INTERNSHIP_DISABLE_SUCCESS':
            console.log("INTERNSHIP_DISABLE_SUCCESS");
            return {
                state
            }
        case 'INTERNSHIP_DISABLE_ERROR':
                console.log("INTERNSHIP_DISABLE_ERROR");
                return {
                    state
                }
        default:
            return state;
    }
    
}

export default internshipReducer;