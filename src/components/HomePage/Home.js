import React from 'react';
import {Button, Container } from 'semantic-ui-react';

class Home extends React.Component
{
    render(){
        return(
            <Container  style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px"}}> WELCOME !</h1>
            </Container>
        )
    }
}

export default Home;