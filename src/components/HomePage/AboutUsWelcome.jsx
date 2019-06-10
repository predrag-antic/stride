import { Grid, Form, Segment, Button, Header, Message, Icon, Image } from 'semantic-ui-react';
import React from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect,NavLink } from 'react-router-dom';



class AboutUsWelcome extends React.Component{

render(){

    return(
        <Grid textAlign="center" verticalAlign="middle" className="welcome" style={{marginLeft:'0rem',marginTop:'0rem'}}>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as="h1" textAlign="center" style={{color:"white",fontFamily:"Nexa Bold",fontWeight:"600"}}>
                    <Image src={require('../../assets/logo.png')} to='/appWelcome' as={NavLink}/><br></br>
                    Back to welcome page
                </Header>
                <h1 style={{textAlign:"center",fontSize:"40px", fontFamily:"Nexa Regular", marginBottom:"40px"}}>About</h1>
                <h4 style={{textAlign:"center",fontSize:"40px", fontFamily:"Nexa Regular", marginBottom:"40px"}}>
                    Users : {this.props.userProfilesNumber}
                </h4>
                <h4 style={{textAlign:"center",fontSize:"40px", fontFamily:"Nexa Regular", marginBottom:"40px"}}>
                    Companies : {this.props.companyProfilesNumber}
                </h4>
                <h4 style={{textAlign:"center",fontSize:"40px", fontFamily:"Nexa Regular", marginBottom:"40px"}}>
                    Projects: {this.props.projectsNumber}
                </h4>
                <h4 style={{textAlign:"center",fontSize:"40px", fontFamily:"Nexa Regular", marginBottom:"40px"}}>
                    Internships: {this.props.internshipsNumber}
                </h4>
                <h4 style={{textAlign:"center",fontSize:"40px", fontFamily:"Nexa Regular", marginBottom:"40px"}}>
                    Jobs: {this.props.jobsNumber}
                </h4>
            </Grid.Column>
        </Grid>
    )
}

}

const mapStateToProps=state=>{
    console.log(state);

    var jobsNumber=0;
    var internshipsNumber=0;
    var projectsNumber=0;
    var userProfilesNumber=0;
    var companyProfilesNumber=0;

    var jobs=state.firestore.ordered.jobs;
    var internships=state.firestore.ordered.internships;
    var projects=state.firestore.ordered.projects;
    var profiles=state.firestore.ordered.profiles;

    if(jobs!==undefined){
        jobsNumber=jobs.length;
    }

    if(internships!==undefined){
        internshipsNumber=internships.length;
    }

    if(projects!==undefined){
        projectsNumber=projects.length;
    }

    if(profiles!==undefined){
        profiles.map((profile)=>{
            if(profile.userOrCompany==="User"){
                userProfilesNumber+=1;
            }else{
                companyProfilesNumber+=1;
            }
        })
    }


    return{
        jobsNumber:jobsNumber,
        internshipsNumber:internshipsNumber,
        projectsNumber:projectsNumber,
        userProfilesNumber:userProfilesNumber,
        companyProfilesNumber:companyProfilesNumber
}}

export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([
        { 
            collection: 'jobs'
        },
        { 
            collection: 'internships' 
        },
        { 
            collection: 'projects' 
        },
        { 
            collection: 'profiles' 
        }
    ])
    )(AboutUsWelcome);
