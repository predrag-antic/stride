import { Button, Container, Grid, Card, Image, Icon, Divider } from 'semantic-ui-react';

import {connect} from 'react-redux';
import React from 'react';
import {NavLink} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Welcome from './Welcome';
import Spinner from '../../Spinner'

class Home extends React.Component{

    render(){

        const { firstAccess, userName }=this.props;

        if(firstAccess===undefined){ // undefine je sasvim malo dok se ne ucitaju podaci iz firebase/profile-a
            return  <Spinner/>;
        }else if(firstAccess===true){
            return  <Welcome/>
        }else{
            return (
                <Container>
                    <h1 style={{textAlign:"center",fontSize:"40px", fontFamily:"Nexa Bold", marginBottom:"40px"}}>
                        Welcome {userName}!
                    </h1>
                    <Divider></Divider>
                    <p style={{textAlign:"center", margin:"60px 0px", fontSize:"18px"}}>
                    Stride is the #1 job site in the Serbia with 200+ unique visitors every month. Stride strives to put job seekers first, giving them free access to search for jobs, post resumes, and research companies. Every day, we connect thousands of people to new opportunities.
                    </p>
                    <Divider></Divider>
                    <Container style={{textAlign:"center", marginTop:"60px", marginBottom:"60px"}}>
                    <Grid stackable >
                        <Grid.Row columns={3}>
                        <Grid.Column>
                        <Card as={NavLink} to='/jobs' centered>
                                <Image src={require('../../assets/jobs.jpg')} wrapped ui={false} />
                                <Card.Content>
                                <Card.Header>Explore Jobs</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Jobs</span>
                                </Card.Meta>
                                <Card.Description>
                                    See jobs tailored to your background and interests.
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name='briefcase' />
                                       {this.props.jobsNumber}+ jobs
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card as={NavLink} to='/internships' centered>
                                <Image src={require('../../assets/internships.jpg')} wrapped ui={false} />
                                <Card.Content>
                                <Card.Header>Explore Internships</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Internships</span>
                                </Card.Meta>
                                <Card.Description>
                                    Boost your experience with various internships.
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name='graduation cap' />
                                    {this.props.internshipsNumber}+ internships
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                        <Card as={NavLink} to='/projects' centered>
                                <Image src={require('../../assets/projects.jpg')} wrapped ui={false} />
                                <Card.Content>
                                <Card.Header>Explore Projects</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Projects</span>
                                </Card.Meta>
                                <Card.Description>
                                    If you prefer smaller groups, this is the right choice for you.
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name='laptop' />
                                        {this.props.projectsNumber}+ projects
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </Container>
                </Container>
            )
        }
    }
}

const mapStateToProps=state=>{

    var jobsNumber=0;
    var internshipsNumber=0;
    var projectsNumber=0;

    var jobs=state.firestore.ordered.jobs;
    var internships=state.firestore.ordered.internships;
    var projects=state.firestore.ordered.projects;

    if(jobs!==undefined){
        jobsNumber=jobs.length;
    }

    if(internships!==undefined){
        internshipsNumber=internships.length;
    }

    if(projects!==undefined){
        projectsNumber=projects.length;
    }


    return{
        userName: state.firebase.profile.name,
        firstAccess: state.firebase.profile.firstAccess,
        jobsNumber:jobsNumber,
        internshipsNumber:internshipsNumber,
        projectsNumber:projectsNumber
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
        }
    ])
    )(Home);