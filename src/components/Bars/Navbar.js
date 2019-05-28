import { Menu,Header,Icon, Label, Container, Dropdown, DropdownItem, DropdownMenu} from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import { NavLink,Link } from 'react-router-dom';

import Logout from '../Auth/Logout';
import NavbarCompanyLinks from './NavbarLinks/NavbarCompanyLinks'

class Navbar extends React.Component
{
    render(){

        const {userOrCompany,userName}=this.props;

        return(
        <>
            <Menu size="massive" inverted borderless style={{background: '#4c3c4c',fontSize:'1.2re',marginRight:"250px"}} >
                <Container fluid>
                    <Menu.Item position="right">
                    {userOrCompany===undefined?
                    <p/>:userOrCompany==="User"?
                    <h3>User navigation</h3>:<NavbarCompanyLinks/>
                    }
                    </Menu.Item>
                    <Menu.Item position="right">
                       <Dropdown direction='left' icon='envelope' title='notification'>
                        <DropdownMenu>
                            <DropdownItem>Notification 1</DropdownItem>
                            <DropdownItem>Notification 2</DropdownItem>
                            <DropdownItem>Notification 3</DropdownItem>
                            <DropdownItem>Notification 4</DropdownItem>
                        </DropdownMenu>
                       </Dropdown>
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown direction='left' icon='user circle' >
                        <Dropdown.Menu>
                        {userOrCompany===undefined?
                        <div/>:userOrCompany==="User"?
                            <DropdownItem to='/profile' as={NavLink}>
                                <i /> My profile
                            </DropdownItem>
                            :
                            <DropdownItem to='/company' as={NavLink}>
                                <i /> My profile
                            </DropdownItem>
                             }
                            <DropdownItem to='/resume' as={NavLink}>
                            <i />
                                Resume
                            </DropdownItem>
                            <Dropdown.Item icon='cancel'>
                                <Logout />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>  
                </Container>  
            </Menu>
        </>
        )
    }
}

const mapStateToProps=state=>{
    return{
        userOrCompany: state.firebase.profile.userOrCompany
    }
}

export default connect(mapStateToProps,null)(Navbar);