import { Button, Container } from 'semantic-ui-react';

import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

import { NavLink } from 'react-router-dom';


import React from 'react';

class UserProjects extends React.Component{

    render(){
        const {myProjects}=this.props;
                   
        if(myProjects){
            return(
                <Container style={{marginTop:"7em"}}>
                    <h1 style={{textAlign:"center",fontSize:"30px", fontFamily:"Nexa Bold"}}> User projects </h1>
                    <Container style={{textAlign:"center",marginTop:"50px"}}>
                        <Container >
                        <div>
                            {this.props.myProjects.map((project)=>{
                                return (
                                <div key={project.id} style={{borderLeft:"10px solid #03254c",background:"white", textAlign:"center", height:"120px", marginTop:"20px",verticalAlign:"middle"}}>
                                    <h3 style={{paddingTop:"20px"}}>{project.title}</h3>
                                    <Button as={NavLink} to={`project-detail/${project.id}`} style={{textAlign:"center", background:"#d0efff"}}>
                                        Details
                                    </Button>
                                    <Button as={NavLink} to={`update-project/${project.id}`} style={{textAlign:"center", background:"#d0efff"}}>
                                        Update
                                    </Button>    
                                    <Button as={NavLink} to={`users-project-applications/${project.id}`} style={{textAlign:"center", background:"#d0efff"}}>
                                        Users Applications
                                    </Button>                             
                                </div>
                                )
                            })}
                        </div>
                        </Container>
                    </Container>
                </Container>
            )
        }
        else if(myProjects!=undefined)
        {
            return (
                <div style={{textAlign: 'center'}}>
                    <h3 style={{marginTop:"60px"}}>You haven't added any projects yet!</h3>
                </div>
                )
        }
    }
}

const mapStateToProps = (state) => {
    
    const projects = state.firestore.ordered.projects;
    const userId=state.firebase.auth.uid; 
    const myProjects=[]
    if(projects!==undefined){
        projects.map((project)=>{
            if(project.authorId===userId){
                myProjects.push(project);
                console.log(project.title);
            }
        })
    }
    
    return {
        myProjects: myProjects
    }
}

export default compose(connect(mapStateToProps), firestoreConnect([{ collection:'projects' }])) (UserProjects)