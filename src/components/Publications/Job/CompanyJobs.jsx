import { Button, Container } from 'semantic-ui-react';

import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Link } from 'react-router-dom';

import { NavLink } from 'react-router-dom';


import React from 'react';

class CompanyJobs extends React.Component{

    render(){
        const {myJobs}=this.props;
                   
        if(myJobs){
            return(
                <Container style={{width:"100%",height:"100%"}}>
                    <h1 style={{textAlign:"center",marginRight:"250px"}}> COMPANY JOBS </h1>
                    <Container style={{textAlign:"center",marginTop:"50px",width:"100%",height:"100%"}}>
                        <Container >
                        <div>
                            {this.props.myJobs.map((job)=>{
                                return (
                                <div key={job.id} style={{textAlign:"center",marginRight:"250px",height:"150px",marginTop:"5px",
                                borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                                    <h3>{job.title}</h3>
                                    <Button as={NavLink} to={`job-detail/${job.id}`}>
                                        Details
                                    </Button>
                                    <Button as={NavLink} to={`update-job/${job.id}`} style={{textAlign:"center", borderColor:"#dee2e8",borderWidth:"1px"}}>
                                        Update
                                    </Button>   
                                </div>
                                )
                            })}
                        </div>
                        </Container>
                    </Container>
                </Container>
            )
        }
        else
        {
            return (
                <div style={{textAlign: 'center', marginRight: "250px"}}>
                    <p>You didn't add jobs publication yet</p>
                </div>
                )
        }
    }
}

const mapStateToProps = (state) => {
    
    const jobs = state.firestore.ordered.jobs; 
    const userId=state.firebase.auth.uid; 
    const myJobs=[]
    if(jobs!==undefined){
        jobs.map((job)=>{
            if(job.authorId===userId){
                myJobs.push(job);
                console.log(job.title);
            }
        })
    }
    
    return {
         myJobs: myJobs
    }
}

export default compose(connect(mapStateToProps), firestoreConnect([{ collection: 'jobs' } 
    ])) (CompanyJobs)