
import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import {Link} from 'react-router-dom'
import { render } from 'react-dom';

import  { applyToProject } from '../../../store/actions/projectAplicationAciton';
import {Button, Container, Form,TextArea,Checkbox,Divider } from 'semantic-ui-react';
 
class ProjectDetails extends React.Component {

    handleApply=()=>{
        console.log("APPLY");
        this.props.applyToProject(this.props.project,this.props.projectId);
    }

    render(){
    
        const { project, alreadyApplied, projectAuthorName } = this.props;
        
    if ( project ) {
        return (
            <div style={{textAlign:'center', marginRight: 250, marginTop:"250px",
                borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                <div>
                    <div>
                        <h1 style={{fontSize: 40}}>{ project.title }</h1>
                        <p style={{fontSize: 20}}> Project description: <br/> { project.description }</p>
                        <p style={{fontSize: 20}}>Project tehnology: <br/> { project.tehnology }</p>
                        <p style={{fontSize: 20}}>Project duration: <br/> { project.duration }</p>
                        {
                                alreadyApplied? 
                                <h4>Hey there! You already applied for this!</h4>
                                :
                                project.isAvailable?
                                <Button onClick={this.handleApply}> {/* onClick={this.handleApply} */}
                                    Apply
                                </Button>
                                :
                                <h4>This project is closed!</h4>
                        }
                        <Link to = {'/company-detail/' + project.authorId}>
                            <p>Published by: {project.projectAuthorName} </p>
                        </Link>
                        <p>Published:  {moment(project.createdAt.toDate()).format('MMMM Do YYYY h:mm:ss a')}</p>
                        
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{textAlign: 'center', marginRight: 250}}>
                <p>Loading project...</p>
            </div>
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
         alreadyApplied:alreadyApplied
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),firestoreConnect([{ collection: 'projects' }]))(ProjectDetails)