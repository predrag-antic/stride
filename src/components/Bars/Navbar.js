import { Menu,Header,Icon, Label, Container } from 'semantic-ui-react';

import React from 'react';
import { NavLink,Link } from 'react-router-dom';

import Logout from '../Auth/Logout';

class Navbar extends React.Component
{
    render(){
        return(
        <>
            <Menu size="mini" inverted borderless style={{background: '#4c3c4c',fontSize:'1.2re',marginRight:"250px"}} >
                <Container fluid>
                    <Menu.Item position="right">
                        Dodacemo 
                    </Menu.Item>
                    <Menu.Item>
                        <Logout/> 
                    </Menu.Item>  
                </Container>  
            </Menu>
        </>
        )
    }
}

export default Navbar;