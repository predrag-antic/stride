import { Button, Container } from 'semantic-ui-react';

 import ProjectList from './ProjectList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';


 import React from 'react';

 class ProjectPage extends React.Component{

     render(){
        const {projects}=this.props;
        return(
            <Container style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px"}}> PROJECTS PAGE </h1>
                <Container style={{textAlign:"center",marginTop:"50px",width:"100%",height:"100%"}}>
                    <Container >
                        <ProjectList listOfProjects={projects}>

                         </ProjectList>
                    </Container>
                </Container>
            </Container>
        )
    }
}

 const mapStateToProps=(state)=>{
    console.log(state);
    return{
        projects:state.firestore.ordered.projects
    }
}

 export default compose(connect(mapStateToProps,null),
    firestoreConnect([{collection:'projects'}]))(ProjectPage);