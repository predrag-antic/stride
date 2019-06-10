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
                    <Menu.Item  position="right" as={NavLink} to="/about-us-welcome" style={{fontSize:'18px',color:'white'}}>
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
                    <p style={{color:'white',fontSize:'20px',textAlign:'center',fontFamily:'Nexa Regular',padding:'0px 300px'}}>
                    Stride is a platform for job and internship search. 
                    The purpose of the system is to facilitate students, graduates and postgraduates the way to the desired job, 
                    internship or professional development, and to connect them with companies and employers who will get a young, motivated, and above all, expert staff.
                    </p>
                    <Button as={NavLink} to="/login" style={{marginRight:'30px',marginTop:'30px'}} size='big' inverted>Log In</Button>
                    <Button as={NavLink} to="/register" size='big' inverted>Register</Button>
                </div>
                
            </div>
      );
    }
  }
  
  export default AppWelcome;
  