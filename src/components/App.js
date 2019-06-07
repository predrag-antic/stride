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
import { getAllMyProjectApplications} from '../store/actions/projectApplicationsAction'
import { getAllMyJobApplications } from '../store/actions/jobApplicationsAction';

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

    const { getAllMyInternshipApplications, getAllMyProjectApplications } = this.props;

    if(!this.props.auth.uid) return <Redirect to="/app-welcome" />
    {getAllMyInternshipApplications()}
    {getAllMyJobApplications()}
    return(
          <Container>
          <BrowserRouter>
            <Navbar/>
            <Sidebar/>
            <div style={{marginLeft:"18em",marginTop:"4em"}}> 
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
    getAllMyProjectApplications:()=>dispatch(getAllMyProjectApplications())
  }
}

const mapStateToProps=state=>{
  return{
    auth : state.firebase.auth
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
