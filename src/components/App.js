import React from 'react';
import {BrowserRouter , Router, Switch, Route, withRouter} from 'react-router-dom';
import Info from '../components/Info/Info';
import { Grid,Menu, GridColumn, Segment } from 'semantic-ui-react';
import './App.css';

import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

const App = () => (
  
  <BrowserRouter>
    <div>
      <Menu size="large" inverted fixed="top"  style={{background: '#4c3c4c',fontSize:'1.2re'}} >
        <Menu.Item position="right">
            <Messages />  
        </Menu.Item>
        <Menu.Item>
            <MetaPanel/> 
        </Menu.Item>    
      </Menu>
            <Grid columns="equal" className="app" style={{background: '#eee'}} >
              <ColorPanel/>
              <SidePanel/>
              <Route path='/info' component={Info}></Route>
            </Grid>
    </div>
  </BrowserRouter>
)

export default App;
