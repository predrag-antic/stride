
import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import {Link} from 'react-router-dom'
import { render } from 'react-dom';

import { applyUserToJob } from '../../../store/actions/jobApplicationsAction';
import {Button, Container, Form,TextArea,Checkbox,Divider } from 'semantic-ui-react';
 
class JobDetails extends React.Component {

    handleApply=()=>{
        console.log("APPLY");
        this.props.applyUserToJob(this.props.job,this.props.jobId);
    }

    render(){
    
        const { job, alreadyApplied, jobAuthorName } = this.props;
        
    if (job && (alreadyApplied!==undefined)) {
        return (
            <div style={{textAlign:'center', marginRight: 250, marginTop:"250px",
                borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                <div>
                    <div>
                        <h1 style={{fontSize: 40}}>{ job.title }</h1>
                        <p style={{fontSize: 20}}> Job description: <br/> { job.description }</p>
                        <p style={{fontSize: 20}}>Job position: <br/> { job.position }</p>
                        <p style={{fontSize: 20}}>Available positions: <br/> { job.availablePositions }</p>
                        {
                                alreadyApplied? 
                                <h4>Hey there! You already applied for this!</h4>
                                :
                                job.isAvailable?
                                <Button onClick={this.handleApply}>
                                    Apply
                                </Button>
                                :
                                <h4>This job is closed!</h4>
                        }
                        <Link to = {'/company-detail/' + job.authorId}>
                            <p>Published by: {job.jobAuthorName} </p>
                        </Link>
                        <p>Published:  {moment(job.createdAt).format('MMMM Do YYYY h:mm:ss a')}</p>
                        
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{textAlign: 'center', marginRight: 250}}>
                <p>Loading job...</p>
            </div>
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