import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Link} from 'react-router-dom'
import moment from 'moment'

 const ProjectDetails = (props) => {
    const { project } = props; 
    if (project) {
        return (
            <div style={{textAlign:'center', marginRight: 250, marginTop:"250px",
                borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                <div>
                    <div>
                        <h1 style={{fontSize: 40}}>{ project.title }</h1>
                        <p style={{fontSize: 20}}> Description: <br/> { project.description }</p>
                        <p style={{fontSize: 20}}> Technology: <br/> { project.technology }</p>
                        <p style={{fontSize: 20}}> Duration: <br/> { project.duration }</p>
                        <p>Published by:
                            <Link to = {'/user-detail/' + project.authorId} style={{marginLeft:"5px"}}>
                                {project.projectAuthorName}
                            </Link>
                        </p>
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

 const mapStateToProps = (state, ovdeProps) => {
    const id = ovdeProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
         project: project
    }
}

 export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails) 