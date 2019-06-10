const initState={
    position:"All",
    technology:"All"
};

const jobFilterReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'JOB_FILTER_SUCCESS':            
            state.position=action.position;
            state.technology=action.technology;
            return state;
        default:
            return state;
        }
        
    }

export default jobFilterReducer;