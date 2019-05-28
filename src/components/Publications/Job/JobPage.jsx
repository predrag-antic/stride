import { Button, Container } from 'semantic-ui-react';

import JobList from './JobList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

import {getAllJobsFromFirestore} from '../../../store/actions/jobAction'

import React from 'react';

class JobPage extends React.Component{

    render(){
        const {jobs}=this.props;
        return(
            <Container style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px"}}> JOBS PAGE </h1>
                <Container style={{textAlign:"center",marginTop:"50px",width:"100%",height:"100%"}}>
                    <Container >
                        <JobList listOfJobs={jobs}>

                        </JobList>
                    </Container>
                </Container>
            </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log(state);
    return{
        jobs:state.firestore.ordered.jobs
    }
}

export default compose(connect(mapStateToProps,null),
    firestoreConnect([{collection:'jobs'}]))(JobPage);