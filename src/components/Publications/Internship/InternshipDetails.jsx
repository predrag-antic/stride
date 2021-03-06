
import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {applyUserToInternship} from '../../../store/actions/internshipApplicationsAction'
import {Button, Container, Form,Divider,Grid,Card } from 'semantic-ui-react';
import Spinner from '../../../Spinner';

 
class InternshipDetails extends React.Component{

    handleApply=()=>{
        this.props.applyUserToInternship(this.props.internship,this.props.internshipId);
    }

    render(){

        const { internship,alreadyApplied } = this.props; 

        if (internship && (alreadyApplied!==undefined)) {
            return (
                <Container style={{marginTop:"7em"}}>
                    <Container style={{textAlign: 'center', marginTop: '30px'}}>
                        <Form>
                        <Card fluid style={{padding:"40px", marginBottom:"50px"}}>
                            <Form.Field style={{fontSize:"40px", marginTop:"20px" , fontFamily:"Nexa Bold", lineHeight: 1}}>
                                { internship.title }
                            </Form.Field>
                        <Divider style={{margin:"20px"}}></Divider>  
                            <Grid stackable >
                            <Grid.Row columns={2} style={{margin:"0px 50px"}}>
                                <Grid.Column>
                                    <label >City:</label>
                                    <Form.Field style={{fontSize:"22px", marginTop:"10px",fontWeight:"bold" }}>
                                        { internship.city }
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <label >Duration:</label>
                                    <Form.Field style={{fontSize:"22px", marginTop:"10px",fontWeight:"bold" }}>
                                        { internship.duration }
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={3} style={{margin:"0px 50px"}}>
                                <Grid.Column>
                                    <label >Technology:</label>
                                    <Form.Field style={{fontSize:"22px", marginTop:"10px",fontWeight:"bold" }}>
                                        { internship.technology }
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <label >Deadline for applying:</label>
                                    <Form.Field style={{fontSize:"22px", marginTop:"10px", fontWeight:"bold"}}>
                                        { internship.date }
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <label >Paid internship:</label>
                                    <Form.Field style={{fontSize:"22px", marginTop:"10px", fontWeight:"bold"}}>
                                        { internship.paid }
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            </Grid>
                        <Divider style={{margin:"30px 20px"}}></Divider>  
                        <Form.Field>
                            <h2>Internship description</h2>
                            <p style={{padding:"20px 40px"}}>{internship.description}</p>
                        </Form.Field> 
                        <Divider style={{margin:"20px"}}></Divider>
                        {
                                this.props.userOrCompany==="Company"?
                                <Form.Field style={{fontSize:"18px", fontWeight:"bold"}}>
                                    Only users can apply for internship.
                                </Form.Field>
                                :
                                alreadyApplied? 
                                <Form.Field style={{fontSize:"18px", fontWeight:"bold"}}>
                                    You already applied for this internship!
                                </Form.Field>
                                :
                                internship.isAvailable?
                                <Button onClick={this.handleApply} style={{marginTop:"20px", background:"#d0efff"}}>
                                    Apply
                                </Button>
                                :
                                <Form.Field style={{fontSize:"18px", fontWeight:"bold"}}>
                                    This internship is closed!
                                </Form.Field>
                            }
                            <p style={{marginTop:"20px"}}>Published by:
                            <Link style={{marginLeft:"5px"}} to = {'/company-detail/' + internship.authorId}>
                                 {internship.internshipAuthorName} 
                            </Link>
                            </p>
                            <p>{moment(internship.createdAt.toDate()).format('MMMM Do YYYY / h:mm:ss a')}</p>
                        </Card>
                        </Form>
                    </Container>
                </Container>
            )
            } else {
                return (
                    <Spinner/>
                    )
                } 
        }
    }


const mapDispatchToProps=(dispatch)=>{
    return{
        applyUserToInternship:
        (thisInternship,thisInternshipId)=>dispatch(applyUserToInternship(thisInternship,thisInternshipId))
    }
}

const mapStateToProps = (state, ownProps) => {

    const thisInternshipId = ownProps.match.params.id;

    //Am I already applied for this internship?
    const myInternshipApplicationsId=state.internshipApplications;
    var  alreadyApplied=false;
    myInternshipApplicationsId.map((myInternshipId)=>{
        if(myInternshipId===thisInternshipId)
        alreadyApplied=true
    })
    
    const internships = state.firestore.data.internships;
    const internship = internships ? internships[thisInternshipId] : null
    return {
        internship: internship,
        internshipId:thisInternshipId,
        alreadyApplied:alreadyApplied,
        userOrCompany: state.firebase.profile.userOrCompany
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        { collection: 'internships' }
    ])
)(InternshipDetails)