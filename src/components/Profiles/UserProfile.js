import {Button, Container } from 'semantic-ui-react';

import React from 'react';

class UserProfile extends React.Component
{
    render(){
        return(
            <Container style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px"}}> User info </h1>
            </Container>
        )
    }
}

export default UserProfile;