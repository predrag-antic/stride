import React from "react";
import {Menu, Button, Container, Image, Icon, Label} from 'semantic-ui-react';
import { NavLink,Link } from 'react-router-dom';

class AppWelcome extends React.Component{
    
  
    render(){
      return(
            <div className='welcome'>
                <Menu secondary size="small" inverted fixed='top' style={{margin:'20px 50px',paddingRight:'100px'}} >
                <Container fluid >
                    <Menu.Item>
                        <Image src={require("../assets/strideLogo.png")} size='small'></Image>
                    </Menu.Item>
                    <Menu.Item  position="right" as={NavLink} to="/about-us" style={{fontSize:'18px',color:'white'}}>
                            <Icon name="question circle"/>About Us
                    </Menu.Item>  
                    <Menu.Item  as={NavLink} to="/login" style={{fontSize:'18px',color:'white'}}>
                           <Icon name="key"/>Log In
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/register" style={{fontSize:'18px',color:'white'}}>
                            <Icon name="user circle"/>Register
                    </Menu.Item>
                </Container>  
                </Menu>
                <div style={{textAlign:'center',verticalAlign:'middle',paddingTop:'200px'}}>
                    <p style={{color:'white',fontSize:'50px',zIndex:'1',position:'relative',textAlign:'center',verticalAlign:'center',fontFamily:'Nexa Bold'}}>
                        Welcome to Stride!
                    </p>
                    <p style={{color:'white',fontSize:'20px',zIndex:'1',textAlign:'center',fontFamily:'Nexa Regular',padding:'0px 300px'}}>
                        Esse excepteur do eu et duis dolore nostrud.Ad exercitation duis aute aliquip. 
                        Sit consectetur Lorem eu velit est ut proident deserunt irure. Culpa minim aliqua sint velit excepteur minim est ex id Lorem. 
                        Occaecat et officia commodo ipsum commodo enim aute ipsum ea consectetur esse exercitation. 
                    </p>
                    <Button as={NavLink} to="/login" style={{marginRight:'30px',marginTop:'30px'}} size='big' inverted>Log In</Button>
                    <Button as={NavLink} to="/register" size='big' inverted>Register</Button>
                </div>
                
            </div>
      );
    }
  }
  
  export default AppWelcome;
  