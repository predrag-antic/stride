import './App.css';

import React from 'react';
import {BrowserRouter , Switch, Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Login from './Auth/Login'
import Register from './Auth/Register';
import Sidebar from './Bars/Sidebar';
import Navbar from './Bars/Navbar';

import routes from '../routes';
import { Container } from 'semantic-ui-react';

class App extends React.Component{

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "") {
        return (
          <Route path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }else{
        return null;
      }
    });
  };

  render(){
    if(!this.props.auth.uid) return <Redirect to="/login" />
    return(
          <Container style={{height: "100%",width: "100%"}}>
          <BrowserRouter>
            <Sidebar/>
              <div style={{position:"absolute",height: "100%",width: "100%",left:"0",top:"0",backgroundColor:"white",                  marginLeft:"250px"}}> 
              <Navbar/>
              <Switch>{this.getRoutes(routes)}</Switch>
              </div>
          </BrowserRouter> 
          </Container>
    );
  }
}

const mapStateToProps=state=>{
  return{
    auth : state.firebase.auth
  }
}

export default connect(mapStateToProps,null)(App);
