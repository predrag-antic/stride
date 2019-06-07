import {Button, Container,Form,Checkbox,TextArea,Select, Card, Message } from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import {createProject} from '../../../store/actions/projectAction'

const projectTechnologyOptions = [
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

  const projectDurationOptions = [
    {text:'2 weeks',value:'2 weeks'},
    {text:'3 weeks',value:'3 weeks'},
    {text:'month',value:'month'},
    {text:'2 months',value:'2 months'},
    {text:'3 months',value:'3 months'},
    {text:'6 months',value:'6 months'},
  ]

class CreateProject extends React.Component{
    
    state = {
        title: '',
        description: '',
        technology: '',
        duration: '',
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

    isFormValid = () => {
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)) {
            error = { message: 'Fill all fields with *'};
            this.setState({errors: errors.concat(error)});
            return false;
        }
        else {
            return true;
        }
    }

    isFormEmpty = ({ title ,description, duration, technology}) => {
        return !title.length || !description.length || 
                !duration.length || !technology.length;
    }

    displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>);

    handlePublish=event=>{
        event.preventDefault();
            if(this.isFormValid()) {
                this.props.createProject(this.state);
                this.props.history.push('/home');
                this.setState({errors: [], loading: true});
            
                setTimeout(()=>{ 
                    if(this.props.error!==null){
                        this.setState({
                            errors:this.state.errors.concat(this.props.error),
                            loading: false                
                        });
                }},1000);
            }
    }

    render(){

        const {title,description,technology,duration, errors} = this.state;

        return(
            <Container style={{marginTop:"7em"}}>
                <h1 style={{textAlign:"center",fontSize:"30px",fontFamily:"Nexa Bold"}}>Project</h1>
                
                <Container style={{textAlign:"left",marginTop:"30px"}}> 
                {errors.length > 0 && (
                    <Message error>
                        <h3>Error</h3>
                        {this.displayErrors(errors)}
                    </Message>
                )}
                <Form onSubmit={this.handlePublish}>
                <Card fluid style={{padding:"40px", marginBottom:"50px"}}>
                    <Form.Field >
                        <Form.Input name="title" value={title} label={"Title: *"} onChange={this.handleChange} placeholder='Please insert project title' />
                    </Form.Field>
                    <Form.Field style={{marginTop:"10px"}}>
                        <Form.TextArea name="description" label={"Project description: *"} value={description} onChange={this.handleChange} 
                         placeholder='Please insert project description' />
                    </Form.Field>
                    <Form.Field style={{marginTop:"10px"}}>
                        <Form.Select label={"Technology: *"} onChange={this.handleSelectChange} options={projectTechnologyOptions} placeholder="Please select technology" name="technology">
                        </Form.Select>
                    </Form.Field>
                    <Form.Field style={{marginTop:"10px"}}>
                        <Form.Select label={"Project duration: *"} onChange={this.handleSelectChange} options={projectDurationOptions} placeholder="Project duration" name="duration" >
                        </Form.Select>
                    </Form.Field>
                    <Form.Field inline style={{marginTop:"10px"}}>
                        <label>Deadline for applying</label>
                        <label>Date picker</label>
                    </Form.Field>
                    <Form.Field inline style={{marginTop:"10px"}}>
                        <label>Earliest start date</label>
                        <label>Date picker</label>
                    </Form.Field>
                    <Button style={{marginTop:"20px", background:"#d0efff"}} type='submit'>Publish</Button>
                </Card>
                </Form>
                </Container>
            </Container>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        createProject:(newProject)=>dispatch(createProject(newProject))
    }
}

const mapStateToProps=(state)=>{
    console.log(state);
    return{
        error: state.auth.authError
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateProject);