import React from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Statistic, Divider } from 'semantic-ui-react'

class About extends React.Component{

render(){

    return(
        <div style={{padding:"0px 30px"}}>
            <h1 style={{textAlign:"center",fontSize:"40px", fontFamily:"Nexa Regular", marginBottom:"40px"}}>About Stride</h1>
           
           <p style={{textAlign:"center",fontSize:"20px", fontFamily:"Nexa Regular"}}>
           The Stride system is a web application for employment that provides information to companies and individuals on the supply and demand of jobs, provides a quality and practical service of advertising, selection and search of jobs and internships and consequently influences the expansion and improvement of the employment opportunities of people in our country.
           </p>
           <Divider style={{margin:"40px 0px"}}></Divider>
           <Statistic.Group widths="5">
                <Statistic >
                    <Statistic.Value>{this.props.userProfilesNumber}</Statistic.Value>
                    <Statistic.Label>Users</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{this.props.companyProfilesNumber}</Statistic.Value>
                    <Statistic.Label>Companies</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{this.props.jobsNumber}</Statistic.Value>
                    <Statistic.Label>Jobs</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{this.props.internshipsNumber}</Statistic.Value>
                    <Statistic.Label>Internships</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{this.props.projectsNumber}</Statistic.Value>
                    <Statistic.Label>Projects</Statistic.Label>
                </Statistic>
            </Statistic.Group>
        
            <Divider style={{margin:"40px 0px"}}></Divider>
        <p style={{textAlign:"center",fontSize:"20px", fontFamily:"Nexa Regular", marginTop:"50px"}}>
        The application will also enable people to form teams for the implementation of various projects, and employers to use methods for easier selection of workers.
        </p>

        </div>
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
    )(About);
