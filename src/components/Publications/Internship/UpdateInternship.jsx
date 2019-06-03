import {Button, Container, Form,TextArea,Checkbox } from 'semantic-ui-react';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
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


class UpdateInternship extends React.Component{
 
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

    handleUpdate=event=>{
        console.log(this.state);
        //ovde da se preko reduxa salju podaci ps. napravi reducer/akcije
        //this.props.history.push('/company-internships');
    }
    

    render(){
        const {internship}=this.props;
        const {title,description,technology,duration} = this.state;
        
        return(
            <Container style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px"}}> Internship </h1>
                <Container style={{textAlign:"center",marginTop:"50px"}}> 
                <Form onSubmit={this.handleUpdate} style={{marginRight:"250px"}}>
                    <Form.Field >
                        <label>Title</label>
                        <input name="title" value={title} onChange={this.handleChange} placeholder={internship.title}
                                style={{width:"75%"}}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Internship Description</label>
                        <TextArea name="description" value={description} onChange={this.handleChange} 
                         placeholder={internship.description} style={{width:"75%"}}/>
                    </Form.Field>
                    <Form.Field >
                        <label>Internship technology</label>
                        <Form.Select  onChange={this.handleSelectChange} options={internshipTechnologyOptions} placeholder={internship.technology} name="technology" style={{width:"75%"}}>
                        </Form.Select>
                    </Form.Field>
                    <Form.Field >
                        <label>Internship duration</label>
                        <Form.Select  onChange={this.handleSelectChange} options={internshipDurationOptions}             placeholder={internship.duration} name="duration" style={{width:"75%"}}>
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
                    <Button style={{marginTop:"50px"}} type='submit'>Update</Button>
                </Form>
                    
                    <Button style={{marginTop:"50px"}} >Disable</Button>
                </Container>
            </Container>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        //update internship
        //disable internship
    }
}

const mapStateToProps = (state, ownProps) => {

    const thisInternshipId = ownProps.match.params.id;
    const internships = state.firestore.data.internships;
    const internship = internships ? internships[thisInternshipId] : null
    return {
        internship: internship,
        internshipId:thisInternshipId,
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        { collection: 'internships' }
    ])
)(UpdateInternship)