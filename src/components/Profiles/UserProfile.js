import {Button, Container } from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import { updateProfile } from '../../store/actions/updateProfile'

class UserProfile extends React.Component{
    state={
        popunioProfil:true
    }

    updateProfile=()=>{
        this.props.updateProfile();
    }

    render(){
        return(
            <Container style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px"}}> User info </h1>
                <Container style={{textAlign:"center",marginTop:"50px"}}> 
                    <Button onClick={this.updateProfile} style={{marginRight:"250px"}}>
                        Submit
                    </Button>
                </Container>
            </Container>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        updateProfile:()=>dispatch(updateProfile())
    }
}

export default connect(null,mapDispatchToProps)(UserProfile);