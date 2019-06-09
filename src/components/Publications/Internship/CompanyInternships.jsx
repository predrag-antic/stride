import { Button, Container } from 'semantic-ui-react';

import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Link } from 'react-router-dom';
import moment from 'moment'

import { NavLink } from 'react-router-dom';


import React from 'react';

class CompanyInternships extends React.Component{

    render(){
        const {myInternships}=this.props;
                   
        if(myInternships){
            return(
                <Container>
                    <h1 style={{textAlign:"center",fontSize:"30px", fontFamily:"Nexa Bold"}}> Company internships </h1>
                    <Container style={{textAlign:"center",marginTop:"50px"}}>
                        <Container >
                        <div>
                            {this.props.myInternships.map((internship)=>{
                                return (
                                <div key={internship.id} style={{borderLeft:"10px solid #03254c",background:"white", textAlign:"center",verticalAlign:"middle", margin:"20px 0px", padding:"20px 5px"}}>
                                    <h3 >{internship.title}</h3>
                                    <Button as={NavLink} to={`internship-detail/${internship.id}`} style={{textAlign:"center", background:"#d0efff"}}>
                                        Details
                                    </Button>
                                    <Button as={NavLink} to={`update-internship/${internship.id}`} style={{textAlign:"center", background:"#d0efff"}}>
                                        Update
                                    </Button>  
                                    <Button as={NavLink} to={`users-internship-applications/${internship.id}`} style={{textAlign:"center", background:"#d0efff"}}>
                                        User applications
                                    </Button>         
                                    <p style={{marginTop:"10px"}}>{moment(internship.createdAt.toDate()).format('MMMM Do YYYY / h:mm:ss a')}</p>                          
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
                <div style={{textAlign:'center'}}>
                    <h3 style={{marginTop:"60px"}}>You havent't added any internship yet.</h3>
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