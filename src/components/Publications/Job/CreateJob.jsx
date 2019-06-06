import {Button, Container,Form,Checkbox,TextArea,Select } from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import {createJob} from '../../../store/actions/jobAction'

const jobPositionsOptions = [
    {text:'Junior Developer',value:'junior'},
    {text:'Senior Developer',value:'senior'},
    {text:'Other',value:'other'}
  ]

  const jobTechnologyOptions = [
    {text:'All',value:'All'},
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


class CreateJob extends React.Component{
    
    state = {
        title: '',
        description: '',
        position: '',
        technology:'',
        availablePosition: '',
        remote:false,
        errors: [],
        loading: false
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    handlePositionSelectChange=(event,data)=>{
        this.setState({[data.name]:data.value})
    }

    handleTechnologySelectChange=(event,data)=>{
        this.setState({[data.name]:data.value})
    }

    handleChangeRemote=(event,data)=>{
        this.setState({remote:data.checked})
    }

    handlePublish=event=>{
        console.log(this.state);
        //ovde da se preko reduxa salju podaci ps. napravi reducer/akcije
        //uhvati greske ovde!
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
                        <input name="title" value={title} onChange={this.handleChange} placeholder='Title' 
                                style={{width:"75%"}}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Job Description</label>
                        <TextArea name="description" value={description} onChange={this.handleChange} 
                         placeholder='Please describe a job...' style={{width:"75%"}}/>
                    </Form.Field>
                    <Form.Field >
                        <label>Job position</label>
                        <Form.Select  onChange={this.handlePositionSelectChange} options={jobPositionsOptions} placeholder="Job position" name="position" style={{width:"75%"}}>
                        </Form.Select>
                    </Form.Field>
                    <Form.Field >
                        <label>Technology</label>
                        <Form.Select  onChange={this.handleTechnologySelectChange} options={jobTechnologyOptions} placeholder="Technology" name="technology" style={{width:"75%"}}>
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
                    <Button style={{marginTop:"50px"}} type='submit'>Publish</Button>
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

const mapStateToProps=(state)=>{
    console.log(state);
    return{

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateJob);