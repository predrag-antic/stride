
import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import {Link} from 'react-router-dom'
import { render } from 'react-dom';

import  { applyToProject } from '../../../store/actions/projectAplicationAciton';
import {Button, Container, Form,TextArea,Checkbox,Divider,Grid,Card } from 'semantic-ui-react';
import Spinner from '../../../Spinner';
 
class ProjectDetails extends React.Component {

    handleApply=()=>{
        console.log("APPLY");
        this.props.applyToProject(this.props.project,this.props.projectId);
    }

    render(){
    
        const { project, alreadyApplied, projectAuthorName } = this.props;
        
    if ( project && (alreadyApplied!==undefined) ) {
        return (
            <Container style={{marginTop:"7em"}}>
                    <Container style={{textAlign: 'center', marginTop: '30px'}}>
                        <Form>
                        <Card fluid style={{padding:"40px", marginBottom:"50px"}}>
                            <Form.Field style={{fontSize:"40px", marginTop:"20px" , fontFamily:"Nexa Bold", verticalAlign:"middle"}}>
                                { project.title }
                            </Form.Field>
                            <Divider style={{margin:"20px"}}></Divider>
                            <Grid stackable >
                            <Grid.Row columns={2} style={{margin:"0px 50px"}}>
                                <Grid.Column>
                                    <label >Duration:</label>
                                    <Form.Field style={{fontSize:"22px", marginTop:"10px",fontWeight:"bold" }}>
                                        { project.duration }
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <label >Technology:</label>
                                    <Form.Field style={{fontSize:"22px", marginTop:"10px",fontWeight:"bold" }}>
                                        { project.technology }
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            </Grid>
                            <Divider style={{margin:"30px 20px"}}></Divider>  
                            <Form.Field>
                                <h2>Project description</h2>
                                <p style={{padding:"20px 40px"}}>{project.description}</p>
                            </Form.Field> 
                            <Divider style={{margin:"20px"}}></Divider>
                            {

                                this.props.userOrCompany==="Company"?
                                <Form.Field style={{fontSize:"18px", fontWeight:"bold"}}>
                                    Only users can apply for projects.
                                </Form.Field>
                                :
                                alreadyApplied? 
                                <Form.Field style={{fontSize:"18px", fontWeight:"bold"}}>
                                    You already applied for this projects!
                                </Form.Field>
                                :
                                (project.authorId===this.props.userId)?
                                <Form.Field style={{fontSize:"18px", fontWeight:"bold"}}>
                                    You can not apply on this project!
                                </Form.Field>
                                :
                                project.isAvailable?
                                <Button onClick={this.handleApply} style={{marginTop:"20px", background:"#d0efff"}}>
                                    Apply
                                </Button>
                                :
                                <Form.Field style={{fontSize:"18px", fontWeight:"bold"}}>
                                    This project is closed!
                                </Form.Field>
                            }

                                {/* alreadyApplied? 
                                <Form.Field style={{fontSize:"18px", fontWeight:"bold"}}>
                                Hey there! You already applied for this!
                                </Form.Field>
                                :
                                (project.isAvailable && project.authorId!==this.props.userId && this.props.userOrCompany==="User")?
                                <Button onClick={this.handleApply} style={{marginTop:"20px", background:"#d0efff"}}>
                                    Apply
                                </Button>
                                :
                                project.authorId===this.props.userId?
                                <Form.Field style={{fontSize:"18px", fontWeight:"bold"}}>
                                    You can not apply on this project.
                                </Form.Field>
                                :
                                <Form.Field style={{fontSize:"18px", fontWeight:"bold"}}>
                                    This project is closed!
                                </Form.Field>
                            } */}
                            <p style={{marginTop:"20px"}}>Published by:
                            <Link style={{marginLeft:"5px"}} to = {'/user-detail/' + project.authorId}>
                                 {project.projectAuthorName} 
                            </Link>
                            </p>
                            <p>{moment(project.createdAt.toDate()).format('MMMM Do YYYY / h:mm:ss a')}</p>
                        </Card>
                        </Form>
                    </Container>
            </Container>
        )
    }
    else {
        return (
            <Spinner/>
            )
    }
}
}

const mapDispatchToProps=(dispatch)=>{
    return{
        applyToProject:
        (thisProject,thisProjectId)=>dispatch(applyToProject(thisProject,thisProjectId))
    }
}

const mapStateToProps = (state, ovdeProps) => {
    const projectId = ovdeProps.match.params.id;

    const myProjectApplicationsId=state.projectApplications;
    var  alreadyApplied=false;
    myProjectApplicationsId.map((myProjectId)=>{
        if(myProjectId===projectId)
        alreadyApplied=true
    })
    console.log(alreadyApplied);


    const projects = state.firestore.data.projects;
    const project = projects ? projects[projectId] : null
    return {
        project: project,
         projectId: projectId,
         alreadyApplied:alreadyApplied,
         userOrCompany: state.firebase.profile.userOrCompany,
         userId: state.firebase.auth.uid
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),firestoreConnect([{ collection: 'projects' }]))(ProjectDetails)