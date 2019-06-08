
import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import {Link} from 'react-router-dom'
import { render } from 'react-dom';

import { applyUserToJob } from '../../../store/actions/jobApplicationsAction';
import {Button, Container, Form,TextArea,Checkbox,Divider, Card, Grid } from 'semantic-ui-react';
import Spinner from '../../../Spinner';
 
class JobDetails extends React.Component {

    handleApply=()=>{
        console.log("APPLY");
        this.props.applyUserToJob(this.props.job,this.props.jobId);
    }

    render(){
    
        const { job, alreadyApplied, jobAuthorName } = this.props;
        
    if (job && (alreadyApplied!==undefined)) {
        return (
            <Container style={{marginTop:"7em"}}>
                <Container style={{textAlign: 'center', marginTop: '30px'}}>
                    <Form>
                    <Card fluid style={{padding:"40px", marginBottom:"50px"}}>
                    <Form.Field style={{fontSize:"40px", marginTop:"20px" , fontFamily:"Nexa Bold", lineHeight: 1}}>
                         { job.title }
                    </Form.Field>
                    <Divider style={{margin:"20px"}}></Divider>  
                    <Grid stackable >
                           <Grid.Row columns={2} style={{margin:"0px 50px"}}>
                                <Grid.Column>
                                    <label >City:</label>
                                    <Form.Field style={{fontSize:"22px", marginTop:"10px", fontWeight:"bold"}}>
                                        { job.city }
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <label >Technology:</label>
                                    <Form.Field style={{fontSize:"22px", marginTop:"10px",fontWeight:"bold" }}>
                                        { job.technology }
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={3} style={{margin:"0px 50px"}}>
                                <Grid.Column>
                                    <label >Position:</label>
                                    <Form.Field style={{fontSize:"22px", marginTop:"10px", fontWeight:"bold"}}>
                                        { job.position }
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <label >Available positions:</label>
                                    <Form.Field style={{fontSize:"22px", marginTop:"10px",fontWeight:"bold" }}>
                                        { job.availablePositions }
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <label >Remote:</label>
                                    <Form.Field style={{fontSize:"22px",fontWeight:"bold" }}>
                                        {job.remote===true?
                                        <p>Yes</p>:<p>No</p>
                                        }
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row> 
                    </Grid>
                    <Divider style={{margin:"30px 20px"}}></Divider>  
                    <Form.Field>
                        <h2>Job description</h2>
                        <p style={{padding:"20px 40px"}}>{job.description}</p>
                    </Form.Field> 
                    <Divider style={{margin:"20px"}}></Divider>  
                    {
                                alreadyApplied? 
                                <Form.Field style={{fontSize:"18px", fontWeight:"bold"}}>
                                    Hey there! You already applied for this!
                                </Form.Field>
                                :
                                job.isAvailable?
                                <Button onClick={this.handleApply} style={{marginTop:"20px", background:"#d0efff"}}>
                                    Apply
                                </Button>
                                :
                                <Form.Field style={{fontSize:"18px", fontWeight:"bold"}}>
                                    This job is closed!
                                </Form.Field>
                        }
                        <p style={{marginTop:"20px"}}>Published by:
                        <Link style={{marginLeft:"5px"}} to = {'/company-detail/' + job.authorId}>
                             {job.jobAuthorName} 
                        </Link>
                        </p>
                        <p>{moment(job.createdAt.toDate()).format('MMMM Do YYYY / h:mm:ss a')}</p>
                    </Card>
                    </Form>
                    </Container>
            </Container>
        )
    }
    else {
        return (
            <Spinner/>
            )
    }
}
}

const mapDispatchToProps=(dispatch)=>{
    return{
        applyUserToJob:
        (thisJob,thisJobId)=>dispatch(applyUserToJob(thisJob,thisJobId))
    }
}

const mapStateToProps = (state, ovdeProps) => {
    const jobId = ovdeProps.match.params.id;

    const myJobApplicationsId=state.jobApplications;
    var  alreadyApplied=false;
    myJobApplicationsId.map((myJobId)=>{
        if(myJobId===jobId)
        alreadyApplied=true
    })
    console.log(alreadyApplied);


    const jobs = state.firestore.data.jobs;
    const job = jobs ? jobs[jobId] : null
    return {
         job: job,
         jobId: jobId,
         alreadyApplied:alreadyApplied
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),firestoreConnect([{ collection: 'jobs' }]))(JobDetails)