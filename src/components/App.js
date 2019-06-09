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
import {getAllMyInternshipApplications} from '../store/actions/internshipApplicationsAction'
import { getAllMyProjectApplications} from '../store/actions/projectAplicationAciton'
import { getAllMyJobApplications } from '../store/actions/jobApplicationsAction';
import { Responsive, Segment } from 'semantic-ui-react'

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

    const { getAllMyJobApplications, getAllMyProjectApplications,getAllMyInternshipApplications } = this.props;


    if(!this.props.auth.uid) return <Redirect to="/app-welcome" />
    {getAllMyInternshipApplications()}
    {getAllMyProjectApplications()}
    {getAllMyJobApplications()}
    return(
          <Container>
          <BrowserRouter>
            <Navbar className="topNav2"/>
            <Responsive as={Segment} minWidth={768}>
              <Sidebar/>
            </Responsive>
            <div className="centar"> 
              <Switch>{this.getRoutes(routes)}</Switch>
            </div>
          </BrowserRouter> 
          </Container>
    );
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    getAllMyInternshipApplications:()=>dispatch(getAllMyInternshipApplications()),
    getAllMyJobApplications:()=>dispatch(getAllMyJobApplications()),
    getAllMyProjectApplications:()=>dispatch(getAllMyProjectApplications())
  }
}

const mapStateToProps=state=>{
  return{
    auth : state.firebase.auth
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
