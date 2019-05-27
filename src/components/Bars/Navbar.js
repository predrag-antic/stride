import { Menu,Header,Icon, Label, Container } from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import { NavLink,Link } from 'react-router-dom';

import Logout from '../Auth/Logout';
import NavbarCompanyLinks from './NavbarLinks/NavbarCompanyLinks'

class Navbar extends React.Component
{
    render(){

        const {userOrCompany}=this.props;

        return(
        <>
            <Menu size="mini" inverted borderless style={{background: '#4c3c4c',fontSize:'1.2re',marginRight:"250px"}} >
                <Container fluid>
                    <Menu.Item position="right">
                    {this.props.userOrCompany===undefined?
                    <p/>:this.props.userOrCompany==="User"?
                    <h1>User navigation</h1>:<NavbarCompanyLinks/>
                    }
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

const mapStateToProps=state=>{
    return{
        userOrCompany: state.firebase.profile.userOrCompany
    }
}

export default connect(mapStateToProps,null)(Navbar);