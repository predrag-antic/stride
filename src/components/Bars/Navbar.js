import { Button, Menu, Image, Header,Icon, Label, Container, Dropdown, DropdownItem, DropdownMenu} from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import { NavLink,Link } from 'react-router-dom';

import Logout from '../Auth/Logout';
import NavbarCompanyLinks from './NavbarLinks/NavbarCompanyLinks'

class Navbar extends React.Component
{
    render(){

        const {userOrCompany, userName, firstAccess, avatarUrl, avatar}=this.props;
        const trigger = (
            <span>
                {firstAccess===true? <Image avatar src={avatar}/>:
                    avatarUrl===null?
                        <div/>:avatarUrl===""?
                        <Image avatar src={avatar} style={{backgroundColor:"white"}}/>
                        :
                        <Image avatar src={avatarUrl} style={{backgroundColor:"white"}}/>
                
                }
            </span>
          );

        return(
        <>
            <Menu size="massive" inverted fixed="top" borderless style={{background: '#187bcd',fontSize:'1.2re',paddingLeft:'380px', height:'60px'}} >
                <Container fluid>
                    <Menu.Item position="right">
                    {userOrCompany===undefined?
                    <p/>:userOrCompany==="User"?
                    //<h3>Welcome, {userName}</h3>
                    firstAccess===true? 
                    <div>
                        <Button animated size="mini" inverted disabled to="/post-project" >
                            <Button.Content visible>
                                Post Project
                            </Button.Content>
                            <Button.Content hidden>
                            <Icon name="laptop"/>
                            </Button.Content>
                            </Button>
                    </div>
                    :
                    <div>
                        <Button animated size="mini" inverted as={NavLink} to="/post-project" >
                            <Button.Content visible>
                                Post Project
                            </Button.Content>
                            <Button.Content hidden>
                            <Icon name="laptop"/>
                            </Button.Content>
                            </Button>
                    </div>
                       
                    
                    :<NavbarCompanyLinks/>
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
                        <Dropdown direction='left' trigger={trigger} icon={null}>
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
                            null
                            :
                            <DropdownItem to='/company-jobs' as={NavLink}>
                                <i /> Posted jobs
                            </DropdownItem>
                             }
                             {/*<DropdownItem to='/profile-posts' as={NavLink}>
                                <i /> My posts
                            </DropdownItem>*/}
                            
                        {userOrCompany===undefined?
                        <div/>:userOrCompany==="User"?
                            <DropdownItem to='/my-job-applications' as={NavLink}>
                                <i /> My job applications
                            </DropdownItem>
                            :
                            null
                        }
                        {userOrCompany===undefined?
                        <div/>:userOrCompany==="User"?
                            <DropdownItem to='/my-applications' as={NavLink}>
                                <i /> My internship applications
                            </DropdownItem>
                            :
                            null
                             }
                        {userOrCompany===undefined?
                        <div/>:userOrCompany==="User"?
                            <DropdownItem to='/my-project-applications' as={NavLink}>
                                <i /> My projects applications
                            </DropdownItem>
                            :
                            null
                             }
                        {userOrCompany===undefined?
                        <div/>:userOrCompany==="User"?
                            <DropdownItem to='/user-projects' as={NavLink}>
                                <i /> Posted projects
                            </DropdownItem>
                            :
                            null
                            }
                        {userOrCompany===undefined?
                        <div/>:userOrCompany==="User"?
                            null
                            :
                            <DropdownItem to='/company-internships' as={NavLink}>
                                <i /> Posted Internships
                            </DropdownItem>
                             }

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
        avatarUrl: state.firebase.profile.avatarUrl,
        userOrCompany: state.firebase.profile.userOrCompany,
        userName: state.firebase.profile.name,
        firstAccess: state.firebase.profile.firstAccess,
        avatar: state.firebase.profile.avatar
    }
}

export default connect(mapStateToProps,null)(Navbar);