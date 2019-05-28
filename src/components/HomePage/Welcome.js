import { Button, Container } from 'semantic-ui-react';

import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom'
import React from 'react';

class Welcome extends React.Component{
    
    render(){

        const {userName, userOrCompany}=this.props;

        return(
            <Container  style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px",marginTop:"50px"}}>
                     WELCOME {userName} !
                </h1>
                <Container style={{textAlign:"center",marginTop:"50px"}}> 
                    <p style={{marginRight:"250px"}}>
                        We hope your visit will help you understand the opportunities 
                        and potential rewards that are available when you take a 
                        proactive approach to your personal financial situation. 
                        created this website to help you gain a better understanding 
                        of the financial concepts behind insurance, investing, 
                        retirement, estate planning, and wealth preservation.

                    Please click on button "Complete Profile" to coplete your Profile!
                    </p> 
                    </Container>
                <Container style={{textAlign:"center",marginTop:"50px"}}> 
                    {console.log()}
                {userOrCompany===undefined?
                        <div/>:userOrCompany==="User"?
                    <Button style={{marginRight:"250px"}} as={NavLink} to="/profile" > 
                        Complete Profile
                    </Button>
                    :
                    <Button style={{marginRight:"250px"}} as={NavLink} to="/company" > 
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