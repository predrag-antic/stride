import { Button, Container } from 'semantic-ui-react';

import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Link } from 'react-router-dom';


import React from 'react';

class CompanyInternships extends React.Component{

    render(){
        const {myInternships}=this.props;
                   
        if(myInternships){
            return(
                <Container style={{width:"100%",height:"100%"}}>
                    <h1 style={{textAlign:"center",marginRight:"250px"}}> COMPANY INTERNSHIPS </h1>
                    <Container style={{textAlign:"center",marginTop:"50px",width:"100%",height:"100%"}}>
                        <Container >
                        <div>
                            {this.props.myInternships.map((internship)=>{
                                return (
                                <div key={internship.id} style={{textAlign:"center",marginRight:"250px",height:"150px",marginTop:"5px",
                                borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                                    <h3>{internship.title}</h3>
                                    <Link to={`/internshipdetail/${internship.id}`}>
                                    <Button>
                                        Details
                                    </Button>
                                    <Button style={{textAlign:"center", borderColor:"#dee2e8",borderWidth:"1px"}}>
                                        Update
                                    </Button>
                                    <Button style={{textAlign:"center", borderColor:"#dee2e8",borderWidth:"1px"}}>
                                        Delete
                                    </Button>
                                    
                                </Link>
                                </div>
                                )
                            })}
                        </div>
                        </Container>
                    </Container>
                </Container>
            )
        }
        else if(myInternships!=undefined)
        {
            return (
                <div style={{textAlign: 'center', marginRight: "250px"}}>
                    <h1>You didn't add internship publication yet</h1>
                </div>
                )
        }
    }
}

const mapStateToProps = (state) => {
    
    const internships = state.firestore.ordered.internships;
    const userId=state.firebase.auth.uid; 
    const myInternships=[]
    if(internships!==undefined){
        internships.map((internship)=>{
            if(internship.authorId===userId){
                myInternships.push(internship);
                console.log(internship.title);
            }
        })
    }
    
    return {
        myInternships: myInternships
    }
}

export default compose(connect(mapStateToProps), firestoreConnect([{ collection:'internships' }])) (CompanyInternships)