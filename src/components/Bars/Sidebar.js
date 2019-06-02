import { Menu, Header, Icon, Label, Container, Image } from 'semantic-ui-react';

import React from 'react';
import { NavLink,Link } from 'react-router-dom';

class Sidebar extends React.Component
{
    

    render(){
        const {userOrCompany} = this.props;

        return(
                <Menu size="large" borderless inverted fixed="left" vertical style={{background: '#1167b1', textAlign:"center", fontSize:'1.2re'}}> 
                    <Container fluid>  
                        <Menu.Header style={{padding: '1em', marginBottom:"200px"}} as={NavLink} to='/home'>
                            <Image centered src={require('../../strideLogo.png')} size='small'></Image>
                        </Menu.Header>
                        <Menu.Item as={NavLink} to="/home" >
                            Home
                        </Menu.Item>
                        <Menu.Item as={NavLink} to="/aboutUs">
                            About us
                        </Menu.Item>
                        <Menu.Item as={NavLink} to="/jobs">
                            Jobs
                        </Menu.Item>
                        <Menu.Item as={NavLink} to="/internships">
                            Internships
                        </Menu.Item>
                        <Menu.Item as={NavLink} to="/projects">
                            Projects
                        </Menu.Item>

                    </Container>   
                </Menu>
        )
    }
}

export default Sidebar;