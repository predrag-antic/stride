const initState={
    authError:null
}

const authReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'SIGNIN_ERROR':
            return {
                ...state,
                authError:action.error
            }
         case 'SIGNIN_SUCCES':
            return{
                ...state,
                authError:null,
            }
        case 'SINGOUT_SUCCES':
            return{
                ...state,
                authError:null,
            }
        case 'REGISTER_SUCCES':
            return{
                ...state,
                authError:null,
            }
        case 'REGISTER_ERROR':
            return{
                ...state,
                authError:action.error
            }
        default:
            return state;
    }
}

export default authReducer;