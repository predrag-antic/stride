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
                <Container style={{width:"100%",height:"100%"}}>
                    <h1 style={{textAlign:"center",marginRight:"250px"}}> User's projects </h1>
                    <Container style={{textAlign:"center",marginTop:"50px",width:"100%",height:"100%"}}>
                        <Container >
                        <div>
                            {this.props.myProjects.map((project)=>{
                                return (
                                <div key={project.id} style={{textAlign:"center",marginRight:"250px",height:"150px",marginTop:"5px",
                                borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                                    <h3>{project.title}</h3>
                                    <Button as={NavLink} to={`project-detail/${project.id}`}>
                                        Details
                                    </Button>
                                    <Button as={NavLink} to={`update-project/${project.id}`} style={{textAlign:"center", borderColor:"#dee2e8",borderWidth:"1px"}}>
                                        Update
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
                <div style={{textAlign: 'center', marginRight: "250px"}}>
                    <h1>You haven't added any projects yet!</h1>
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