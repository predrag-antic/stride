import { firestoreReducer } from 'redux-firestore';
import  authReducer  from './authReducer';
import updateReducer from './updateReducer'
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    update:updateReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;