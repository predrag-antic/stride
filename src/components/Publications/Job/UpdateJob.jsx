import {Button, Container,Form,Checkbox,TextArea,Select, Confirm,Card,Grid } from 'semantic-ui-react';

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

  const jobTechnologyOptions = [
    {text:'.NET',value:'.NET'},
    {text:'ASP.NET',value:'ASP.NET'},
    {text:'Angular',value:'Angular'},
    {text:'Bach/Shell',value:'Bash/Shell'},
    {text:'C',value:'C'},
    {text:'C#',value:'C#'},
    {text:'C++',value:'C++'},
    {text:'Django',value:'Django'},
    {text:'Elixir',value:'Elixir'},
    {text:'Express',value:'Express'},
    {text:'Flash',value:'Flash'},
    {text:'Go',value:'Go'},
    {text:'HTML/CSS',value:'HTML/CSS'},
    {text:'Java',value:'Java'},
    {text:'JavaScript',value:'JavaScript'},
    {text:'Kotlin',value:'Kotlin'},
    {text:'Laravel',value:'Laravel'},
    {text:'Node.js',value:'Node.js'},
    {text:'Objective-C',value:'Objective-C'},
    {text:'PHP',value:'PHP'},
    {text:'Python',value:'Python'},
    {text:'React',value:'React'},
    {text:'React Native',value:'React Native'},
    {text:'Ruby',value:'Ruby'},
    {text:'Spring',value:'Spring'},
    {text:'Swift',value:'Swift'},
    {text:'TypeScript',value:'TypeScript'},
    {text:'Vue',value:'Vue'},
    {text:'jQuery',value:'jQuery'}
  ]

class UpdateJob extends React.Component{
    
    state = {
        title: '',
        description: '',
        position: '',
        technology:'',
        availablePosition: '',
        remote:false,
        city: '',
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
            technology:job.technology,
            city:job.city,
            availablePosition:job.availablePositions,
            remote: job.remote,
            isDisabled:!this.state.isDisabled
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
        const {job} = this.props;
        const {title,description,position,availablePositions,remote,isDisabled,conformationIsOpen,city} = this.state;
        
        if(job!==null) {
            return(
                <Container style={{marginTop:"7em"}}>
                    {/* <h1 style={{textAlign:"center",fontSize:"30px", fontFamily:"Nexa Bold"}}>Job</h1> */}
                    <Card fluid style={{padding:"40px", marginBottom:"50px"}}>
                    <Container style={{textAlign:"center"}}>
                        <Checkbox label="If you want to update Internship, please set initial state first!" onClick={this.setInitialState} style={{textAlign:"center"}}/>
                    </Container>    
                        <Form onSubmit={this.handleUpdate} style={{marginTop:"40px"}}>
                            <Form.Field >
                                <Form.Input name="title" label="Title: " value={title} onChange={this.handleChange} placeholder={job.title} style={{}}/>
                            </Form.Field>
                            <Form.Field style={{marginTop:"10px"}}>
                                <Form.TextArea name="description" label="Job description:" value={description} onChange={this.handleChange} 
                                placeholder={job.description} style={{}}/>
                            </Form.Field>
                            <Grid stackable >
                                <Grid.Row columns={2} >
                                    <Grid.Column>
                                    <Form.Field style={{marginTop:"10px"}}>
                                            <Form.Select label="Job position:" onChange={this.handleSelectChange} options={jobPositionsOptions} placeholder={job.position} name="position" style={{}}>
                                            </Form.Select>
                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form.Field style={{marginTop:"10px"}}>
                                            <Form.Select label="Technology:"  onChange={this.handleSelectChange} options={jobTechnologyOptions} placeholder={job.technology} name="technology" style={{}}>
                                            </Form.Select>
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2} >
                                    <Grid.Column>
                                        <Form.Field style={{marginTop:"0px"}}>
                                            <Form.Input name="availablePosition" label="Number of available positons :" value={availablePositions} onChange={this.handleChange} placeholder={job.availablePositions} type="number" min="1"  style={{}}/>
                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form.Field style={{paddingTop:"30px"}}>
                                            <Checkbox value="remote" label="Remote:" name="remote" onChange={this.handleChangeRemote} checked={remote} toggle />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                                </Grid>
                            <Form.Field style={{marginTop:"30px"}}>
                                <Form.Input name="city"  label={"City: "} value={city} onChange={this.handleChange} placeholder={job.city} />
                            </Form.Field>
                            <Container style={{textAlign:"center"}}>
                                <Button  disabled={isDisabled} style={{marginTop:"20px", background:"#d0efff",textAlign:"center"}} type='submit'>
                                Update Changes
                            </Button>
                            </Container>
                        </Form>
                        <Container style={{textAlign:"center"}}>
                            <Button onClick={this.handleOpenConformation} style={{marginTop:"20px", background:"#d0efff"}}>
                                Disable Job
                            </Button>

                            <Confirm open={conformationIsOpen} onCancel={this.handleCloseConformation} onConfirm={this.handleDisable}  content='Are you sure that you want to disable this job?' confirmButton="Disable"/>
                        </Container>
                    
                    </Card>
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
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props)=>[
        { 
            collection: 'jobs' 
        }
    ])
)(UpdateJob)
