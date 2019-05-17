import React from 'react';
import {Button } from 'semantic-ui-react';
import firebase from '../../firebase'; 
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
class MetaPanel extends React.Component
{
    handleSignOut=()=>{
        firebase
        .auth()
        .signOut()
        .then(()=>console.log("signed out!"));
    }

    render(){
        return(
            <div><Button inverted onClick={this.handleSignOut}>SignOut</Button></div>
        )
    }
}

export default MetaPanel;