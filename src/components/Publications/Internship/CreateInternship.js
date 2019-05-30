import {Button, Container, Form,TextArea,Checkbox } from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import {createInternship} from '../../../store/actions/internshipAction'

const internshipTechnologyOptions = [
    {text:'Backend',value:'Backend'},
    {text:'Frontend',value:'Frontend'},
    {text:'C#',value:'C#'},
    {text:'Java',value:'Java'},
    {text:'Angular',value:'Angular'},
    {text:'React',value:'React'},
    {other:'Other',value:'Other'}
  ]

  const internshipDurationOptions = [
    {text:'2 weeks',value:'2 weeks'},
    {text:'3 weeks',value:'3 weeks'},
    {text:'month',value:'month'},
    {text:'2 months',value:'2 months'},
    {text:'3 months',value:'3 months'},
    {text:'6 months',value:'6 months'},
  ]


class CreateInternship extends React.Component{
 
    state = {
        title: '',
        description: '',
        technology: '',
        duration:'',
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
        //ovde da se preko reduxa salju podaci ps. napravi reducer/akcije
        this.props.createInternship(this.state);
        this.props.history.push('/home');
    }

    render(){

        const {title,description,technology,duration} = this.state;

        return(
            <Container style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px"}}> Internship </h1>
                <Container style={{textAlign:"center",marginTop:"50px"}}> 
                <Form onSubmit={this.handlePublish} style={{marginRight:"250px"}}>
                    <Form.Field >
                        <label>Title</label>
                        <input name="title" value={title} onChange={this.handleChange} placeholder='Title' 
                                style={{width:"75%"}}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Internship Description</label>
                        <TextArea name="description" value={description} onChange={this.handleChange} 
                         placeholder='Please describe a internship...' style={{width:"75%"}}/>
                    </Form.Field>
                    <Form.Field >
                        <label>Internship technology</label>
                        <Form.Select  onChange={this.handleSelectChange} options={internshipTechnologyOptions} placeholder="Internship technology" name="technology" style={{width:"75%"}}>
                        </Form.Select>
                    </Form.Field>
                    <Form.Field >
                        <label>Internship duration</label>
                        <Form.Select  onChange={this.handleSelectChange} options={internshipDurationOptions}             placeholder="Internship duration" name="duration" style={{width:"75%"}}>
                        </Form.Select>
                    </Form.Field>
                    <Form.Field inline>
                        <label>Deadline for applying</label>
                        <label>Date picker</label>
                    </Form.Field>
                    <Form.Field inline>
                        <label>Earliest start date</label>
                        <label>Date picker</label>
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
        createInternship:(newInternship)=>dispatch(createInternship(newInternship))
    }
}

const mapStateToProps=(state)=>{
    console.log(state);
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInternship);