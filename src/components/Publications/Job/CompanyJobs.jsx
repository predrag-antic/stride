import { Button, Container } from 'semantic-ui-react';

import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Link } from 'react-router-dom';
import moment from 'moment'

import { NavLink } from 'react-router-dom';


import React from 'react';

class CompanyJobs extends React.Component{

    render(){
        const {myJobs}=this.props;
                   
        if(myJobs){
            return(
                <Container>
                    <h1 style={{textAlign:"center",fontSize:"30px", fontFamily:"Nexa Bold"}}> Company jobs </h1>
                    
                    <Container style={{textAlign:"center",marginTop:"50px"}}>
                        <Container >
                        <div>
                            {this.props.myJobs.map((job)=>{
                                return (
                                <div key={job.id} style={{borderLeft:"10px solid #03254c",background:"white", textAlign:"center",verticalAlign:"middle", margin:"20px 0px", padding:"20px 5px"}}>
                                    <h3 >{job.title}</h3>
                                    <Button as={NavLink} to={`job-detail/${job.id}`} style={{textAlign:"center", background:"#d0efff"}}>
                                        Details
                                    </Button>
                                    <Button as={NavLink} to={`update-job/${job.id}`} style={{textAlign:"center", background:"#d0efff"}}>
                                        Update
                                    </Button> 
                                    <Button as={NavLink} to={`users-job-applications/${job.id}`} style={{textAlign:"center", background:"#d0efff"}}>
                                        User applications 
                                    </Button> 
                                    <p style={{marginTop:"10px"}}>{moment(job.createdAt.toDate()).format('MMMM Do YYYY / h:mm:ss a')}</p>
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
                <div style={{textAlign:'center'}}>
                    <h3 style={{marginTop:"60px"}}>You haven't added any jobs yet.</h3>
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