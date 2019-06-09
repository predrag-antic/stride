import {Button, Container, Form,TextArea,Checkbox, Card, Message,Grid } from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import {createInternship} from '../../../store/actions/internshipAction'

  const internshipTechnologyOptions = [
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

  const internshipDurationOptions = [
    {text:'2 weeks',value:'2 weeks'},
    {text:'3 weeks',value:'3 weeks'},
    {text:'month',value:'month'},
    {text:'2 months',value:'2 months'},
    {text:'3 months',value:'3 months'},
    {text:'6 months',value:'6 months'},
  ]

  const internshipPaidOptions= [
    {text:'Paid',value:'Paid'},
    {text:'Unpaid',value:'Unpaid'}
  ]


class CreateInternship extends React.Component{
 
    state = {
        title: '',
        description: '',
        technology: '',
        duration:'',
        paidInternship:'',
        date:'',
        city:'',
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

    isFormEmpty = ({ title ,description, duration, paidInternship,city,date}) => {
        return !title.length || !description.length  || !date.length ||
                !duration.length || !paidInternship.length || !city.length;
    }

    displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>);

    handlePublish=event=>{
        event.preventDefault();
        if(this.isFormValid()) {
            this.props.createInternship(this.state);
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

        const {title,description,date,technology,duration,city,errors} = this.state;

        return(
            <Container>
                <h1 style={{textAlign:"center", fontSize:"30px", fontFamily:"Nexa Bold"}}>Internship</h1>
                
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
                        <Form.Input name="title" value={title} label={"Title: *"} onChange={this.handleChange} placeholder='Please insert internship title' />
                    </Form.Field>
                    <Form.Field style={{marginTop:"10px"}}>
                        <Form.TextArea name="description" label={"Internship description: *"} value={description} onChange={this.handleChange} 
                         placeholder='Please insert internship description' />
                    </Form.Field>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Form.Field style={{marginTop:"10px"}}>
                                    <Form.Select label={"Technology: "} onChange={this.handleSelectChange} options={internshipTechnologyOptions} placeholder="Please insert technology" name="technology">
                                    </Form.Select>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field style={{marginTop:"10px"}}>
                                    <Form.Select label={"Internship duration *"} onChange={this.handleSelectChange} options={internshipDurationOptions} placeholder="Please insert internship duration" name="duration" >
                                    </Form.Select>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Form.Field style={{marginTop:"0px"}}>
                                    <Form.Select label={"Paid internship: *"} onChange={this.handleSelectChange} options={internshipPaidOptions} placeholder="Please insert paid/unpaid" name="paidInternship" >
                                    </Form.Select>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                 <Form.Field style={{marginTop:"0px"}}>
                                    <Form.Input type="date" name="date" min={new Date()} label={"Deadline for applying: *"} onChange={this.handleChange} placeholder={"Insert date"}/>
                                </Form.Field >
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Form.Field style={{marginTop:"30px"}}>
                        <Form.Input name="city"  label={"City: *"} value={city} onChange={this.handleChange} placeholder='Please insert city' />
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
        createInternship:(newInternship)=>dispatch(createInternship(newInternship))
    }
}

const mapStateToProps=(state)=>{
    console.log(state);
    return{
        error: state.auth.authError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInternship);