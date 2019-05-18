import React from 'react';
import {BrowserRouter , Router, Switch, Route, withRouter} from 'react-router-dom';
import { Grid,Menu, GridColumn, Segment, Container } from 'semantic-ui-react';
import './App.css';

import Sidebar from './Bars/Sidebar';
import Navbar from './Bars/Navbar';
import routes from '../routes';

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
      } else {
        console.log("VRACA NULL");
        return null;
      }
    });
  };

  render(){
    return(
          <>
              <Sidebar/>
              <div style={{position:"absolute",height: "100%",width: "100%",left:"0",top:"0",backgroundColor:"white",                  marginLeft:"250px"}}> 
              <Navbar/>
              <Switch>{this.getRoutes(routes)}</Switch>
              </div>
          </>
  );
  }
}

export default App;
