import {Button, Container,Form,Checkbox,TextArea,Select,Card, Message } from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import {createJob} from '../../../store/actions/jobAction'

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

class CreateJob extends React.Component{
    
    state = {
        title: '',
        description: '',
        position: '',
        technology:'',
        availablePosition: '',
        remote: false,
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

    isFormEmpty = ({ title ,description,availablePosition}) => {
        return !title.length || !description.length || 
                !availablePosition.length ;
    }

    displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>);

    handlePublish = event =>{
        event.preventDefault();
            if(this.isFormValid()) {
                this.props.createJob(this.state);
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

        const {title,description,position,availablePosition,remote,errors} = this.state;

        return(

            <Container style={{marginTop:"7em"}}>
                <h1 style={{textAlign:"center",fontSize:"30px",fontFamily:"Nexa Bold"}}>Job</h1>
                
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
                        <Form.Input name="title" label={"Title: *"} value={title} onChange={this.handleChange} placeholder='Please insert job title' />
                    </Form.Field>
                    <Form.Field style={{marginTop:"10px"}}>
                        <Form.TextArea name="description" label={"Job description: *"} value={description} onChange={this.handleChange} 
                        placeholder='Please insert job description'/>
                    </Form.Field>
                    <Form.Field style={{marginTop:"10px"}}>
                        <Form.Select label={"Job position:"} onChange={this.handlePositionSelectChange} options={jobPositionsOptions} placeholder="Please select job position" name="position" >
                        </Form.Select>
                    </Form.Field>
                    <Form.Field style={{marginTop:"10px"}}>
                        <Form.Select label={"Technology:"} onChange={this.handleTechnologySelectChange} options={jobTechnologyOptions} placeholder="Please select technology" name="technology" >
                        </Form.Select>
                    </Form.Field>
                    <Form.Field style={{marginTop:"10px"}}>
                        <Form.Input name="availablePosition"  label={"Number of available positions: *"} value={availablePosition} onChange={this.handleChange} placeholder='Please insert number of available positions for this job' type="number" min="1" />
                    </Form.Field>
                    <Form.Field inline style={{marginTop:"20px"}}>
                        <Checkbox value="remote" label={"Remote"} name="remote" onChange={this.handleChangeRemote} toggle />
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
        createJob:(newJob)=>dispatch(createJob(newJob))
    }
}

const mapStateToProps=(state)=>{
    console.log(state);
    return{
        error: state.auth.authError
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateJob);