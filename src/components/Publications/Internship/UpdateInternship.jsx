import {Button, Container, Form,TextArea,Checkbox,Confirm } from 'semantic-ui-react';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import React from 'react';
import {connect} from 'react-redux';
import {createInternship} from '../../../store/actions/internshipAction'
import Spinner from '../../../Spinner'
import {updateInternship} from '../../../store/actions/internshipAction'

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
        const {internshipId}=this.props;
        this.props.updateInternship(this.state,internshipId);
        this.props.history.push('/company-internships');
    }
    
    setInitialState=()=>{
        const {internship}=this.props;
        this.setState({
            title:internship.title,
            description:internship.description,
            technology:internship.technology,
            duration:internship.duration,
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
        console.log("Disable");
        //disable
    }

    render(){
        const {internship}=this.props;
        const {title,description,isDisabled,conformationIsOpen} = this.state;

        if(internship!==null){
        return(
            <Container style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px"}}> Internship </h1>
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
                    <Button disabled={isDisabled} style={{marginTop:"50px",marginBottom:"50px"}} type='submit'>
                        Update Changes
                    </Button>
                </Form>
                <Container style={{textAlign:"center"}}>
                    <p style={{marginRight:"250px"}}>
                        Disable option:WHAT IS DISABLE OPTION!
                    </p>

                    <Button onClick={this.handleOpenConformation} style={{marginRight:"250px"}} >
                        Disable Internship
                    </Button>
                    <Confirm open={conformationIsOpen} onCancel={this.handleCloseConformation} onConfirm={this.handleDisable}  content='Are you sure that you want to disable this internship?' confirmButton="Disable"/>
                </Container>    
                </Container>
            </Container>
        )
        }else{
            return  <Spinner/>;
        }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        updateInternship:
        (updatedInternship,updatedInternshipId)=>dispatch(updateInternship(updatedInternship,updatedInternshipId))
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