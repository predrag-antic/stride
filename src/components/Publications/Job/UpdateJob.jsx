import {Button, Container,Form,Checkbox,TextArea,Select } from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import {createJob} from '../../../store/actions/jobAction'
import { firestoreConnect } from 'react-redux-firebase'
import { stat } from 'fs';

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
        loading: false
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    handleSelectChange=(event,data)=>{
        this.setState({[data.name]:data.value})
    }

    handleChangeRemote=(event,data)=>{
        this.setState({remote:data.checked})
    }

    

    handlePublish=event=>{
        console.log(this.state);
        this.props.createJob(this.state);
        this.props.history.push('/home');
    }

    render(){

        const {title,description,position,availablePosition,remote} = this.state;

        return(
            <Container style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px"}}> Job </h1>
                <Container style={{textAlign:"center",marginTop:"50px"}}> 
                <Form onSubmit={this.handlePublish} style={{marginRight:"250px"}}>
                    <Form.Field >
                        <label>Title</label>
                        <input name="title" value={title} onChange={this.handleChange} placeholder={this.state.title} 
                                style={{width:"75%"}}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Job Description</label>
                        <TextArea name="description" value={description} onChange={this.handleChange} 
                         placeholder='Please describe a job...' style={{width:"75%"}}/>
                    </Form.Field>
                    <Form.Field >
                        <label>Job position</label>
                        <Form.Select  onChange={this.handleSelectChange} options={jobPositionsOptions} placeholder="Job position" name="position" style={{width:"75%"}}>
                        </Form.Select>
                    </Form.Field>
                    <Form.Field >
                        <label>Number of available positon for this jos</label>
                        <input name="availablePosition" value={availablePosition} onChange={this.handleChange}            placeholder='Available position for this job'type="number" min="1"  style={{width:"75%"}}/>
                    </Form.Field>
                    <Form.Field inline>
                        <label>Remote</label>
                        <Checkbox value="remote" name="remote" onChange={this.handleChangeRemote} toggle />
                    </Form.Field>
                    <Button style={{marginTop:"50px"}} type='submit'>
                        Update
                    </Button>
                </Form>
                </Container>
            </Container>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        createJob:(newJob)=>dispatch(createJob(newJob))
    }
}

const mapStateToProps = (dispatch)=>{
    return {

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UpdateJob);