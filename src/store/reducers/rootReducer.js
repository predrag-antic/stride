import { firestoreReducer } from 'redux-firestore';
import  authReducer  from './authReducer';
import updateReducer from './updateReducer'
import jobReducer from './jobReducer'
import internshipApplicationReducer from './internshipApplicationsReducer';
import jobApplicationReducer from './jobApplicationsReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import  projectReducer from './projectReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    update:updateReducer,
    jobs:jobReducer,
    projects:projectReducer,
    internshipApplications:internshipApplicationReducer,
    jobApplications: jobApplicationReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;