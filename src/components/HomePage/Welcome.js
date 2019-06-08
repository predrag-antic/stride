import { Button, Container, Divider } from 'semantic-ui-react';

import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom'
import React from 'react';

class Welcome extends React.Component{
    
    render(){

        const {userName, userOrCompany }=this.props;

        return(
            <Container style={{marginTop:"7em"}}>
                <h1 style={{textAlign:"center",fontSize:"40px", fontFamily:"Nexa Regular", marginBottom:"40px"}}>
                     Welcome to Stride !
                </h1>
                <Divider></Divider>
                <p style={{margin:"60px 0px", fontSize:"16px", textAlign:"center"}}>
                    We hope your visit will help you understand the opportunities 
                    and potential rewards that are available when you take a 
                    proactive approach to your personal financial situation. 
                    We created this website to help you gain a better understanding 
                    of the financial concepts behind insurance, investing, 
                    retirement, estate planning, and wealth preservation.

                    Please click on button "Complete Profile" to complete your Profile!
                    </p> 
                    <Divider></Divider>
                <Container style={{textAlign:"center",marginTop:"60px"}}> 
                    {console.log()}
                    {userOrCompany===undefined?
                        <div/>:userOrCompany==="User"?
                    <Button style={{}} as={NavLink} to="/profile" style={{background:"#d0efff"}}> 
                        Complete Profile
                    </Button>
                    :
                    <Button style={{}} as={NavLink} to="/company" > 
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