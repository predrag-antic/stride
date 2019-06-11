import { Button, Menu, Image, Header,Icon, Label, Container, Dropdown, DropdownItem, DropdownMenu} from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import { NavLink,Link } from 'react-router-dom';

import Logout from '../Auth/Logout';
import NavbarCompanyLinks from './NavbarLinks/NavbarCompanyLinks'
import "../App.css"

class Navbar extends React.Component
{
    render(){

        const {userOrCompany, userName, firstAccess, avatarUrl, avatar}=this.props;
        const trigger = (
            <span>
                {firstAccess===true? <Image avatar src={avatar}/>:
                    avatarUrl===null?
                        <div/>:avatarUrl===""?
                        <Image avatar src={avatar} style={{backgroundColor:"white", objectFit:"cover"}}/>
                        :
                        <Image avatar src={avatarUrl} style={{backgroundColor:"white", objectFit:"cover"}}/>
                
                }
            </span>
          );

        return(
        <>
            <Menu size="massive" className="topNav2" inverted fixed="top" borderless style={{background: '#187bcd'}}>
                <Container fluid>
                {firstAccess===true?
                    <Menu.Item className="navButton">
                    <Dropdown text="Stride" style={{fontFamily:"Nexa Regular"}}>
                        <Dropdown.Menu>
                            <Dropdown.Item to='/home' as={NavLink}><Icon name="home" ></Icon> Home</Dropdown.Item>
                            <Dropdown.Item disabled to='/jobs' as={NavLink}><Icon name="briefcase"/>Jobs</Dropdown.Item>
                            <Dropdown.Item disabled to='/internships' as={NavLink}><Icon name="graduation" />Internships</Dropdown.Item>
                            <Dropdown.Item disabled to='/projects' as={NavLink}> <Icon name="laptop"/>Projects</Dropdown.Item>
                            <Dropdown.Item to='/about-us' as={NavLink}><Icon name="question circle"/>About us</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </Menu.Item>
                    :
                    <Menu.Item className="navButton">
                    <Dropdown text="Stride" style={{fontFamily:"Nexa Regular"}}>
                        <Dropdown.Menu>
                            <Dropdown.Item to='/home' as={NavLink}><Icon name="home" ></Icon> Home</Dropdown.Item>
                            <Dropdown.Item to='/jobs' as={NavLink}><Icon name="briefcase"/>Jobs</Dropdown.Item>
                            <Dropdown.Item to='/internships' as={NavLink}><Icon name="graduation" />Internships</Dropdown.Item>
                            <Dropdown.Item to='/projects' as={NavLink}> <Icon name="laptop"/>Projects</Dropdown.Item>
                            <Dropdown.Item to='/about-us' as={NavLink}><Icon name="question circle"/>About us</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </Menu.Item>
                }

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
                                <i /> Job applications
                            </DropdownItem>
                            :
                            null
                        }
                        {userOrCompany===undefined?
                        <div/>:userOrCompany==="User"?
                            <DropdownItem to='/my-applications' as={NavLink}>
                                <i /> Internship applications
                            </DropdownItem>
                            :
                            null
                             }
                        {userOrCompany===undefined?
                        <div/>:userOrCompany==="User"?
                            <DropdownItem to='/my-project-applications' as={NavLink}>
                                <i /> Projects applications
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