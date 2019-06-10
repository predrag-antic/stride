import { Grid, Form, Segment, Button, Header, Message, Icon, Image, Statistic, Divider } from 'semantic-ui-react';
import React from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { NavLink } from 'react-router-dom';



class AboutUsWelcome extends React.Component{

render(){

    return(
        <Grid textAlign="center" verticalAlign="middle" className="welcome" style={{marginLeft:'0rem',marginTop:'0rem'}}>
            <Grid.Column>
                <Header as="h1" textAlign="center" style={{color:"white",fontFamily:"Nexa Bold",fontWeight:"600"}}>
                    <Image src={require('../../assets/logo.png')} to='/appWelcome' as={NavLink}/><br></br>
                </Header>
                <h1 style={{textAlign:"center",fontSize:"40px", fontFamily:"Nexa Regular", marginBottom:"40px",color:"white"}}>About Stride</h1>
                <p style={{textAlign:"center",fontSize:"20px", fontFamily:"Nexa Regular", color:"white", padding:"20px 100px"}}>
                    The Stride system is a web application for employment that provides information to companies and individuals on the supply and demand of jobs, provides a quality and practical service of advertising, selection and search of jobs and internships and consequently influences the expansion and improvement of the employment opportunities of people in our country.
                </p>
                
                <Statistic.Group widths="5" style={{margin:"30px 150px"}}>
                    <Statistic >
                        <Statistic.Value style={{color:"white"}}>{this.props.userProfilesNumber}</Statistic.Value>
                        <Statistic.Label style={{color:"white"}}>Users</Statistic.Label>
                    </Statistic>
                    <Statistic >
                        <Statistic.Value style={{color:"white"}}>{this.props.companyProfilesNumber}</Statistic.Value>
                        <Statistic.Label style={{color:"white"}}>Companies</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value style={{color:"white"}}>{this.props.jobsNumber}</Statistic.Value>
                        <Statistic.Label style={{color:"white"}}>Jobs</Statistic.Label>
                    </Statistic>
                    <Statistic >
                        <Statistic.Value style={{color:"white"}}>{this.props.internshipsNumber}</Statistic.Value>
                        <Statistic.Label style={{color:"white"}}>Internships</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value style={{color:"white"}}>{this.props.projectsNumber}</Statistic.Value>
                        <Statistic.Label style={{color:"white"}}>Projects</Statistic.Label>
                    </Statistic>
                </Statistic.Group>

                <p style={{textAlign:"center",fontSize:"20px", fontFamily:"Nexa Regular", marginTop:"50px", color:"white",padding:"20px 100px"}}>
                    The application will also enable people to form teams for the implementation of various projects, and employers to use methods for easier selection of workers.
                </p>
            </Grid.Column>
        </Grid>
    )
}

}

const mapStateToProps=state=>{

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
