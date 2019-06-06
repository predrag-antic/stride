const initState={
    position:"All",
    technology:"All"
};

const jobFilterReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'JOB_FILTER_SUCCESS':            
            console.log("JOB_FILTER_SUCCESS")
            state.position=action.position;
            state.technology=action.technology;
            console.log(state);
            return state;
        default:
            return state;
        }
        
    }

export default jobFilterReducer;