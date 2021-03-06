import { firestoreReducer } from 'redux-firestore';
import  authReducer  from './authReducer';
import updateReducer from './updateReducer'
import jobReducer from './jobReducer'
import internshipApplicationReducer from './internshipApplicationsReducer';
import jobApplicationReducer from './jobApplicationsReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import projectReducer from './projectReducer';
import jobFilterReducer from './jobFilterReducer'
import internshipFilterReducer from './internshipFilterReducer'
import projectFilterReducer from './projectFilterReducer'
import projectApplicationReducer from './projectApplicationsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    update:updateReducer,
    jobs:jobReducer,
    projects:projectReducer,
    internshipApplications:internshipApplicationReducer,
    jobApplications: jobApplicationReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    jobfilters:jobFilterReducer,
    internshipfilters:internshipFilterReducer,
    projectfilters:projectFilterReducer,
    projectApplications: projectApplicationReducer
});

export default rootReducer;