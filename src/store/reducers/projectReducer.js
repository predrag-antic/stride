const initState=[];

const projectReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'CREATE_PROJECT_SUCCES':            
            console.log("CREATE_PROJECT_SUCCES")
            return {
                ...state  //treba da se dopuni
            }
        case 'CREATE_PROJECT_ERROR':
            console.log("CREATE_PROJECT_ERROR")
            return {
                ...state
            }
        default:
            return state;
    }
    
}

export default projectReducer;