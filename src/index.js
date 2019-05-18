import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';
import Spinner from './Spinner';
import {BrowserRouter as Router, Switch, Route, withRouter,Redirect} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import {setUser,clearUser} from './actions';

const store = createStore((rootReducer), composeWithDevTools());


class Root extends React.Component {
    componentDidMount(){
        firebase
        .auth()
        .onAuthStateChanged(user => {
            if(user){
                this.props.setUser(user);
                this.props.history.push("/home"); //moramo da sredimo ovo(ne moze uvek da nas preusmerava na home)
            }else{                                  //mora nekad da nam dozvoli i dozvoljenu putanju da unesemo rucno npr
                this.props.history.push("/login"); //moramo da sredimo ovo
                this.props.clearUser();
            }
        });
    }

    render(){
        return this.props.isLoading ? <Spinner /> : (
            <Switch>
                <Route exact path="/home" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" render={props => <App {...props} />} /> 
            </Switch>
        );
    }
}

const mapStateFromProps = state => ({
    isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(connect(mapStateFromProps, {setUser,clearUser})(Root));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth />
        </Router>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();

export default Root;