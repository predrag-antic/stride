import {Button, Container, Form,TextArea,Checkbox,Confirm,Card,Grid } from 'semantic-ui-react';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import React from 'react';
import {connect} from 'react-redux';
import Spinner from '../../../Spinner'
import {updateInternship,disableInternship} from '../../../store/actions/internshipAction'
import {Redirect} from 'react-router-dom';

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

class UpdateInternship extends React.Component{
 
    state = {
        title: '',
        description: '',
        technology: '',
        duration:'',
        paidInternship:'',
        date:'',
        city:'',
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
        const {internshipId}=this.props;
        this.props.updateInternship(this.state,internshipId);
        this.props.history.push('/company-internships');
    }
    
    setInitialState=()=>{
        const {internship}=this.props;
        this.setState({
            title:internship.title,
            description:internship.description,
            paidInternship:internship.paid,
            technology:internship.technology,
            duration:internship.duration,
            city:internship.city,
            date:internship.date,
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
        const {internshipId}=this.props;
        
        this.props.disableInternship(internshipId);
        this.props.history.push('/company-internships');
    }

    render(){
        const {internship}=this.props;
        const {title,description,isDisabled,conformationIsOpen,city,date} = this.state;

        if(this.props.userOrCompany==="User") return <Redirect to="/home" />

        if(internship!==null){
        return(
            <Container style={{marginTop:"7em"}}>
                {/* <h1 style={{textAlign:"center",marginRight:"250px"}}> Internship </h1> */}
                <Card fluid style={{padding:"40px", marginBottom:"50px"}}>
                <Container style={{textAlign:"center"}}>
                    <Checkbox label="If you want to update Internship, please set initial state first!" onClick={this.setInitialState} />
                </Container>
                <Container style={{marginTop:"40px"}}> 
                <Form onSubmit={this.handleUpdate}>
                    <Form.Field >
                        <Form.Input name="title" value={title} label="Title:" onChange={this.handleChange} placeholder={internship.title}/>
                    </Form.Field>
                    <Form.Field style={{marginTop:"10px"}}>
                        <Form.TextArea name="description" label="Internship description:" value={description} onChange={this.handleChange} 
                         placeholder={internship.description} />
                    </Form.Field>
                    <Grid stackable >
                        <Grid.Row columns={2} >
                            <Grid.Column>
                                <Form.Field style={{marginTop:"10px"}}>
                                    <Form.Select label="Technology:" onChange={this.handleSelectChange} options={internshipTechnologyOptions} placeholder={internship.technology} name="technology" >
                                    </Form.Select>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field style={{marginTop:"10px"}}>
                                    <Form.Select label="Internship duration:"  onChange={this.handleSelectChange} options={internshipDurationOptions}             placeholder={internship.duration} name="duration">
                                    </Form.Select>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2} >
                            <Grid.Column>
                                <Form.Field >
                                    <Form.Select label="Paid internship" onChange={this.handleSelectChange} options={internshipPaidOptions}             placeholder={internship.paid} name="paidInternship">
                                    </Form.Select>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field >
                                    <Form.Input type="date" label="Deadline for applying:" onChange={this.handleSelectChange} value={date} placeholder={internship.date} name="date">
                                    </Form.Input>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Form.Field style={{marginTop:"30px"}}>
                        <Form.Input name="city"  label={"City: "} value={city} onChange={this.handleChange} placeholder={internship.city} />
                    </Form.Field>
                    <Container style={{textAlign:"center"}}>
                    <Button disabled={isDisabled} style={{marginTop:"20px", background:"#d0efff"}} type='submit'>
                        Update Changes
                    </Button>
                    </Container>
                </Form>
                </Container>
                <Container style={{textAlign:"center"}}>
                    <Button onClick={this.handleOpenConformation} style={{marginTop:"20px", background:"#d0efff"}} >
                        Disable Internship
                    </Button>
                    
                    <Confirm open={conformationIsOpen} onCancel={this.handleCloseConformation} onConfirm={this.handleDisable}  content='Are you sure that you want to disable this internship?' confirmButton="Disable"/>
                </Container>    
            </Card>
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
        (updatedInternship,updatedInternshipId)=>dispatch(updateInternship(updatedInternship,updatedInternshipId)),
        disableInternship:(thisInternshipId)=>dispatch(disableInternship(thisInternshipId))
    }
}

const mapStateToProps = (state, ownProps) => {

    const thisInternshipId = ownProps.match.params.id;
    const internships = state.firestore.data.internships;
    const internship = internships ? internships[thisInternshipId] : null
    return {
        internship: internship,
        internshipId:thisInternshipId,
        userOrCompany: state.firebase.profile.userOrCompany
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        { collection: 'internships' }
    ])
)(UpdateInternship)