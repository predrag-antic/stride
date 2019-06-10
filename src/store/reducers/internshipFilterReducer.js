const initState={
    technology:"All",
    duration:"All",
    paid:"All"
};

const internshipFilterReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'INTERNSHIP_FILTER_SUCCESS':            
            state.technology=action.technology;
            state.duration=action.duration;
            state.paid=action.paid;
            return state;
        default:
            return state;
        }
        
    }

export default internshipFilterReducer;