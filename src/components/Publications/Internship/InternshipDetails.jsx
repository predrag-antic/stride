
import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {applyUserToInternship} from '../../../store/actions/internshipApplicationsAction'
import {Button, Container, Form,TextArea,Checkbox,Divider } from 'semantic-ui-react';

 
class InternshipDetails extends React.Component{

    handleApply=()=>{
        console.log("APPLY");
        this.props.applyUserToInternship(this.props.internship,this.props.internshipId);
    }

    render(){

        const { internship,alreadyApplied } = this.props; 

        if (internship && (alreadyApplied!==undefined)) {
            return (
                <div style={{textAlign:'center', marginRight: 250, marginTop:"250px",
                    borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                    <div>
                        <div>
                            <h1 style={{fontSize: 40}}>{ internship.title }</h1>
                            <p>{internship.description}</p>
                            <p>Duration:{internship.duration} </p>
                            <p>Technology:{internship.technology} </p>
                            <p>Published:{moment(internship.createdAt).format('MMMM Do YYYY h:mm:ss a')}</p>
                            <p>Post by: {internship.name} </p>
                            {
                                alreadyApplied? 
                                <h4>Hey there! You already applied for this!</h4>
                                :
                                internship.isAvailable?
                                <Button onClick={this.handleApply}>
                                    Apply
                                </Button>
                                :
                                <h4>This internship is closed!</h4>
                            }
                            <label style={{marginRight:"5px"}}>Published by:</label>
                            <Link to = {'/company-detail/' + internship.authorId}>
                                 {internship.internshipAuthorName} 
                            </Link>
                            <p>Published:  {moment(internship.createdAt).format('MMMM Do YYYY h:mm:ss a')}</p>
                        </div>
                    </div>
                </div>
                )
            } else {
                return (
                    <div style={{textAlign: 'center', marginRight: 250}}>
                        <p>Loading internship...</p>
                    </div>
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
    console.log(alreadyApplied);
    
    const internships = state.firestore.data.internships;
    const internship = internships ? internships[thisInternshipId] : null
    return {
        internship: internship,
        internshipId:thisInternshipId,
        alreadyApplied:alreadyApplied
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        { collection: 'internships' }
    ])
)(InternshipDetails)