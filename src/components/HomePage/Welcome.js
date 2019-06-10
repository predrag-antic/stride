import { Button, Container, Divider } from 'semantic-ui-react';

import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom'
import React from 'react';

class Welcome extends React.Component{
    
    render(){

        const {userName, userOrCompany }=this.props;

        return(
            <Container>
                <h1 style={{textAlign:"center",fontSize:"40px", fontFamily:"Nexa Bold", marginBottom:"40px"}}>
                     Welcome to Stride !
                </h1>
                <Divider></Divider>
                <p style={{margin:"60px 0px", fontSize:"16px", textAlign:"center"}}>
                    Stride is a platform for job and internship search. 
                    The purpose of the system is to facilitate students, graduates and postgraduates the way to the desired job, 
                    internship or professional development, and to connect them with companies and employers who will get a young, motivated, and above all, expert staff.

                    Please click on button "Complete Profile" to complete your Profile!
                    </p> 
                    <Divider></Divider>
                <Container style={{textAlign:"center",marginTop:"60px"}}> 
                    {console.log()}
                    {userOrCompany===undefined?
                        <div/>:userOrCompany==="User"?
                    <Button style={{background:"#d0efff"}} as={NavLink} to="/profile"> 
                        Complete Profile
                    </Button>
                    :
                    <Button style={{background:"#d0efff"}} as={NavLink} to="/company" > 
                        Complete Profile
                    </Button>
                }
                </Container>
            </Container>    
        )
    }
}

const mapStateToProps=state=>{
    return{
        userName: state.firebase.profile.name,
        userOrCompany: state.firebase.profile.userOrCompany
    }
}

export default connect(mapStateToProps,null)(Welcome);