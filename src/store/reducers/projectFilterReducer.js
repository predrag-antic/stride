const initState={
    technology:"All"
};

const projectFilterReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'PROJECT_FILTER_SUCCESS':            
            state.technology=action.technology;
            return state;
        default:
            return state;
        }
        
    }

export default projectFilterReducer;