import {Button } from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions'

class Logout extends React.Component{
    
    handleSignOut=()=>{
        this.props.signOut();
    }

    render(){
        return(
            <div>
                <div onClick={this.handleSignOut}>
                        Logout
                </div>
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        signOut:()=>dispatch(signOut())
    }
}

export default connect(null,mapDispatchToProps)(Logout);