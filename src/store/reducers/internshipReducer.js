const initState={
    internships:[

    ]
}

const internshipReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'CREATE_INTERNSHIP_SUCCES':            
            console.log("CREATE_INTERNSHIP_SUCCES")
            return {
                state  
            }
        case 'CREATE_INTERNSHIP_ERROR':
            console.log("CREATE_INTERNSHIP_ERROR")
            return {
                state
            }
        default:
            return state;
    }
    
}

export default internshipReducer;