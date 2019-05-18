import React from 'react';
import { Menu,Header,Icon, Label, Container } from 'semantic-ui-react';
import { NavLink,Link } from 'react-router-dom';


class Sidebar extends React.Component
{
    render(){
        return(
                <Menu size="large" borderless inverted fixed="left" vertical style={{background: '#4c3c4c',                     textAlign:"center",fontSize:'1.2re'}}> 
                    <Container fluid>  
                        <Menu.Header style={{padding: '0.5em',marginBottom:"100px"}} as="h1" >
                            <Icon inverted name="briefcase" ></Icon>
                            <span style={{color:"white"}} >Stride</span> 
                        </Menu.Header>
                        <Menu.Item style={{fontSize:"15px"}} as={NavLink} to="/home" >
                            Home
                        </Menu.Item>
                        <Menu.Item style={{fontSize:"15px"}} as={NavLink} to="/profile">
                            Profile
                        </Menu.Item>
                        <Menu.Item style={{fontSize:"15px"}} as={NavLink} to="/information">
                            Information
                        </Menu.Item>
                    </Container>   
                </Menu>
        )
    }
}

export default Sidebar;