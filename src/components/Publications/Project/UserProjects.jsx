import { Button, Container } from 'semantic-ui-react';

import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';

import { NavLink } from 'react-router-dom';


import React from 'react';

class UserProjects extends React.Component{

    render(){
        const {myProjects}=this.props;
                   
        if(this.props.userOrCompany==="Company") return <Redirect to="/home" />

        if(myProjects){
            return(
                <Container>
                    <h1 style={{textAlign:"center",fontSize:"30px", fontFamily:"Nexa Bold"}}> User projects </h1>
                    {
                        myProjects!==undefined && myProjects.length===0?
                        <Container style={{textAlign:"center",marginTop:"50px"}}>
                            <h3> You did not publish any project jet. </h3>
                        </Container>
                        :
                        <Container style={{textAlign:"center",marginTop:"50px"}}>
                            <Container >
                            <div>
                                {this.props.myProjects.map((project)=>{
                                    return (
                                    <div key={project.id} style={{borderLeft:"10px solid #03254c",background:"white", textAlign:"center",verticalAlign:"middle", margin:"20px 0px", padding:"20px 5px"}}>
                                        <h3 style={{}}>{project.title}</h3>
                                        <Button as={NavLink} to={`project-detail/${project.id}`} style={{textAlign:"center", background:"#d0efff", marginTop:"10px"}}>
                                            Details
                                        </Button>
                                        <Button as={NavLink} to={`update-project/${project.id}`} style={{textAlign:"center", background:"#d0efff",marginTop:"10px"}}>
                                            Update
                                        </Button>    
                                        <Button as={NavLink} to={`users-project-applications/${project.id}`} style={{textAlign:"center", background:"#d0efff",marginTop:"10px"}}>
                                            Users Applications
                                        </Button>                             
                                    </div>
                                    )
                                })}
                            </div>
                            </Container>
                        </Container>
                    }
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
            }
        })
    }
    
    return {
        myProjects: myProjects,
        userOrCompany: state.firebase.profile.userOrCompany
    }
}

export default compose(connect(mapStateToProps), firestoreConnect([{ collection:'projects' }])) (UserProjects)