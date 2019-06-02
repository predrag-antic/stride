import { Menu,Header,Icon, Label, Container, Dropdown, DropdownItem, DropdownMenu} from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import { NavLink,Link } from 'react-router-dom';

import Logout from '../Auth/Logout';
import NavbarCompanyLinks from './NavbarLinks/NavbarCompanyLinks'

class Navbar extends React.Component
{
    render(){

        const {userOrCompany,userName, }=this.props;

        return(
        <>
            <Menu size="massive" inverted fixed="top" borderless style={{background: '#187bcd',fontSize:'1.2re',paddingLeft:'380px', height:'60px'}} >
                <Container fluid>
                    <Menu.Item position="right">
                    {userOrCompany===undefined?
                    <p/>:userOrCompany==="User"?
                    <h3>Welcome, {userName}</h3>:<NavbarCompanyLinks/>
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

                        {userOrCompany===undefined?
                        <div/>:userOrCompany==="User"?
                            <DropdownItem to='/profilePosts' as={NavLink}>
                                <i /> My posts
                            </DropdownItem>
                            :
                            <DropdownItem to='/companyJobs' as={NavLink}>
                                <i /> Company jobs
                            </DropdownItem>
                             }

                        {userOrCompany===undefined?
                        <div/>:userOrCompany==="User"?
                            null
                            :
                            <DropdownItem to='/companyInternships' as={NavLink}>
                                <i /> Company's Internships
                            </DropdownItem>
                             }

                            <DropdownItem to='/resume' as={NavLink}>
                            <i />
                                Resume
                            </DropdownItem>
                            <Dropdown.Item>
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
        userOrCompany: state.firebase.profile.userOrCompany,
        userName: state.firebase.profile.name
    }
}

export default connect(mapStateToProps,null)(Navbar);