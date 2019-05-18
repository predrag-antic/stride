import React from 'react';
import {Button } from 'semantic-ui-react';
import firebase from '../../firebase'; 
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

class Logout extends React.Component
{
    handleSignOut=()=>{
        firebase
        .auth()
        .signOut()
        .then(()=>console.log("logout!"));
    }

    render(){
        return(
            <div>
                <Button size="mini" inverted onClick={this.handleSignOut}>
                        Logout
                </Button>
            </div>
        )
    }
}

export default Logout;