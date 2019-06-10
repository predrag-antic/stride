import { Menu, Header, Icon, Label, Container, Image, Divider } from 'semantic-ui-react';
import {connect} from 'react-redux';

import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import Spinner from '../../Spinner';

class Sidebar extends React.Component
{
    

    render(){
        const {userOrCompany,firstAccess} = this.props;

        if(firstAccess===true){
            return (
                <Menu size="large" borderless inverted fixed="left" vertical style={{background: '#1167b1',  fontSize:'16px'}}> 
                    <Container fluid >  
                        <Menu.Header style={{padding: '1em', marginBottom:"150px", textAlign:"center"}} as={NavLink} to='/home'>
                            <Image centered src={require('../../assets/strideLogo.png')} size='small'></Image>
                        </Menu.Header>
                        <Menu.Item as={NavLink} to="/home" style={{paddingLeft:"50px"}}>
                            <Icon name="home" style={{float:"none", marginRight:"10px"}}></Icon> Home
                        </Menu.Item>
                        <Menu.Item  disabled to="/jobs" style={{paddingLeft:"50px"}}>
                            <Icon name="briefcase" style={{float:"none", marginRight:"10px"}}></Icon> Jobs
                        </Menu.Item>
                        <Menu.Item disabled to="/internships" style={{paddingLeft:"50px"}}>
                            <Icon name="graduation" style={{float:"none", marginRight:"10px"}}></Icon> Internships
                        </Menu.Item>
                        <Menu.Item disabled to="/projects" style={{paddingLeft:"50px"}}>
                            <Icon name="laptop" style={{float:"none", marginRight:"10px"}}></Icon> Projects
                        </Menu.Item>
                        <Menu.Item as={NavLink} to="/about-us" style={{paddingLeft:"50px"}}>
                            <Icon name="question circle" style={{float:"none", marginRight:"10px"}}></Icon> About us
                        </Menu.Item>
                    </Container>   
                </Menu>
            )
        }
        else {

        return(
                <Menu size="large" borderless inverted fixed="left" vertical style={{background: '#1167b1',  fontSize:'16px'}}> 
                    <Container fluid >  
                        <Menu.Header style={{padding: '1em', marginBottom:"150px", textAlign:"center"}} as={NavLink} to='/home'>
                            <Image centered src={require('../../assets/strideLogo.png')} size='small'></Image>
                        </Menu.Header>
                        <Menu.Item as={NavLink} to="/home" style={{paddingLeft:"50px"}}>
                            <Icon name="home" style={{float:"none", marginRight:"10px"}}></Icon> Home
                        </Menu.Item>
                        <Menu.Item as={NavLink} to="/about-us" style={{paddingLeft:"50px"}}>
                            <Icon name="question circle" style={{float:"none", marginRight:"10px"}}></Icon> About us
                        </Menu.Item>
                        <Menu.Item as={NavLink} to="/jobs" style={{paddingLeft:"50px"}}>
                            <Icon name="briefcase" style={{float:"none", marginRight:"10px"}}></Icon> Jobs
                        </Menu.Item>
                        <Menu.Item as={NavLink} to="/internships" style={{paddingLeft:"50px"}}>
                            <Icon name="graduation" style={{float:"none", marginRight:"10px"}}></Icon> Internships
                        </Menu.Item>
                        <Menu.Item as={NavLink} to="/projects" style={{paddingLeft:"50px"}}>
                            <Icon name="laptop" style={{float:"none", marginRight:"10px"}}></Icon> Projects
                        </Menu.Item>

                    </Container>   
                </Menu>
        )
    }
    }
}

const mapStateToProps=state=>{
    return{
        firstAccess: state.firebase.profile.firstAccess
}}

export default connect(mapStateToProps,null)(Sidebar);