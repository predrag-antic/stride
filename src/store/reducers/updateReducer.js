const initState={
    updateError:null,
}

const updateReducer=(state=initState,action)=>{
    switch(action.type){
        case 'UPDATE_USER_SUCCES':
            console.log("UPDATE_USER_SUCCES")
            return {
                ...state,
                updateError:null
            }
        case 'UPDATE_COMPANY_SUCCES':
            console.log("UPDATE_COMPANY_SUCCES")
            return {
                ...state,
                updateError:null
            }
        case 'UPDATE_ERROR':
            console.log("UPDATE_ERROR")
            return {
                ...state,
                updateError:action.error
            }
        default:
            return state;
    }
}

export default updateReducer;