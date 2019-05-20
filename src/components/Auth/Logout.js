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
                <Button size="mini" inverted onClick={this.handleSignOut}>
                        Logout
                </Button>
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