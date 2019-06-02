import './index.css';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware,compose } from 'redux';
import {BrowserRouter,Route,Switch,withRouter,IndexRoute} from 'react-router-dom';
import { Provider,connect } from 'react-redux';
import { reactReduxFirebase,getFirebase } from 'react-redux-firebase';
import { reduxFirestore,getFirestore } from 'redux-firestore';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './store/reducers/rootReducer'
import {signIn,signOut} from './store/actions/authActions'

import App from './components/App';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

import firebase from './firebase'
import AppWelcome from './components/AppWelcome';

const store=createStore(rootReducer,
    composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, {useFirestoreForProfile:true,userProfile:'profiles',attachAuthIsReady:true})
    )
);

class Root extends React.Component{

    render(){
    return ( 
        <div>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/appWelcome' component={AppWelcome}/>
            <Route path="/" render={props => <App {...props} />} />
        </Switch>
        </div>
    )
    }
}

const RootWithAuth = withRouter(Root);

store.firebaseAuthIsReady.then(()=>{
    ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <RootWithAuth />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    registerServiceWorker(); 
})

export default Root;
