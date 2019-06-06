import {Button, Container,Form,Checkbox,TextArea,Select, Confirm } from 'semantic-ui-react';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux' 
import React from 'react';
import {connect} from 'react-redux';
import {createJob} from '../../../store/actions/jobAction'
import Spinner from '../../../Spinner'
import {updateJob,disableJob} from '../../../store/actions/jobAction'

const jobPositionsOptions = [
    {text:'Junior Developer',value:'junior'},
    {text:'Senior Developer',value:'senior'},
    {text:'Other',value:'other'}
  ]

class UpdateJob extends React.Component{
    
    state = {
        title: '',
        description: '',
        position: '',
        availablePosition: '',
        remote:false,
        errors: [],
        loading: false,
        isDisabled:true,
        conformationIsOpen:false
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    handleSelectChange=(event,data)=>{
        this.setState({[data.name]:data.value})
    }

    handleUpdate=()=>{
        console.log(this.state);
        const {jobId}=this.props;
        this.props.updateJob(this.state,jobId);
        this.props.history.push('/company-jobs');
    }

    setInitialState=()=>{
        const {job}=this.props;
        this.setState({
            title:job.title,
            description:job.description,
            position:job.position,
            availablePosition:job.availablePosition,
            remote: job.remote,
            isDisabled:false
        })
    }

    handleOpenConformation=()=>{
        this.setState({conformationIsOpen:true})
    }

    handleCloseConformation=()=>{
        this.setState({conformationIsOpen:false})
    }

    handleDisable=()=>{
        const {jobId}=this.props;
        console.log("Disable");
        
        this.props.disableJob(jobId);
        this.props.history.push('/company-jobs');
    }

    handleChangeRemote=(event,data)=>{
        this.setState({remote:data.checked})
    }


    render(){
        const {job,userApplications} = this.props;
        const {title,description,position,availablePosition,remote,isDisabled,conformationIsOpen} = this.state;
        
        if(job!==null) {
            return(
                <Container style={{width:"100%",height:"100%"}}>
                    <h1 style={{textAlign:"center",marginRight:"250px"}}> Job </h1>
                    <Container style={{textAlign:"center"}}>
                    <p style={{marginRight:"250px"}}>
                        If you want to update Internship, please set initial state first!
                    </p>
                    <Button onClick={this.setInitialState} style={{marginRight:"250px"}}>
                        Set Initial State
                    </Button>
                </Container>
                    <Container style={{textAlign:"center",marginTop:"50px"}}> 
                        <Form onSubmit={this.handleUpdate} style={{marginRight:"250px"}}>
                            <Form.Field >
                                <label>Title</label>
                                <input name="title" value={title} onChange={this.handleChange} placeholder={job.title} 
                                        style={{width:"75%"}}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Job Description</label>
                                <TextArea name="description" value={description} onChange={this.handleChange} 
                                placeholder={job.description} style={{width:"75%"}}/>
                            </Form.Field>
                            <Form.Field >
                                <label>Job position</label>
                                <Form.Select  onChange={this.handleSelectChange} options={jobPositionsOptions} placeholder={job.position} name="position" style={{width:"75%"}}>
                                </Form.Select>
                            </Form.Field>
                            <Form.Field >
                                <label>Number of available positons for this job</label>
                                <input name="availablePosition" value={availablePosition} onChange={this.handleChange} placeholder={job.availablePosition} type="number" min="1"  style={{width:"75%"}}/>
                            </Form.Field>
                            <Form.Field inline>
                                <label>Remote</label>
                                <Checkbox value="remote" name="remote" onChange={this.handleChangeRemote} toggle />
                            </Form.Field>
                            <Button disabled={isDisabled} style={{marginTop:"50px",marginBottom:"50px"}} type='submit'>
                                Update Changes
                            </Button>
                        </Form>
                        <Container style={{textAlign:"center"}}>
                            <p style={{marginRight:"250px"}}>
                                Disable option:
                            </p>

                            <Button onClick={this.handleOpenConformation} style={{marginRight:"250px"}} >
                                Disable Internship
                            </Button>
                            <Confirm open={conformationIsOpen} onCancel={this.handleCloseConformation} onConfirm={this.handleDisable}  content='Are you sure that you want to disable this job?' confirmButton="Disable"/>
                        </Container>    
                        <Container>
                            {
                                userApplications===undefined?
                                <Spinner/>
                                :
                                userApplications.length===0?
                                <h3>0 prijavljenih</h3>
                                :
                                userApplications.map((userProfile)=>{
                                return(
                                    <div key={userProfile.userId} style={{textAlign:"center",marginRight:"250px",height:"150px",     marginTop:"5px",borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                                        <h3>{userProfile.userName}</h3>
                                        <h3>{userProfile.userEmail}</h3>
                                    </div>
                                    )
                                })
                            }
                        </Container>
                    </Container>
                </Container>
            )
        }
        else {
            return <Spinner />;
        }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        updateJob:(updatedJob,updatedJobId)=>dispatch(updateJob(updatedJob,updatedJobId)),
        disableJob:(thisJobId)=>dispatch(disableJob(thisJobId))
    }
}

const mapStateToProps = (state, ownProps) => {

    const thisJobId = ownProps.match.params.id;
    const jobs = state.firestore.data.jobs;
    const job = jobs ? jobs[thisJobId] : null
    return {
        job: job,
        jobId:thisJobId,
        userApplications:state.firestore.ordered.userApplications
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props)=>[
        { 
            collection: 'jobs' 
        },
        {
            collection:'jobs',
            doc:props.jobId,
            subcollections:[{collection:'userApplications'}],
            storeAs: 'userApplications'
        }
    ])
)(UpdateJob)
