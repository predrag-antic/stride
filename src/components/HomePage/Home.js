import { Button, Container, Grid, Card, Image, Icon, Divider } from 'semantic-ui-react';

import {connect} from 'react-redux';
import React from 'react';
import {Link,NavLink} from 'react-router-dom';

import Welcome from './Welcome';
import Spinner from '../../Spinner'

class Home extends React.Component{

    render(){

        const { firstAccess }=this.props;

        if(firstAccess===undefined){ // undefine je sasvim malo dok se ne ucitaju podaci iz firebase/profile-a
            console.log(firstAccess);
            return  <Spinner/>;
        }else if(firstAccess===true){
            return  <Welcome/>
        }else{
            return (
                <Container style={{marginTop:"7em"}}>
                    <h1 style={{textAlign:"center",fontSize:"40px", fontFamily:"Nexa", marginBottom:"40px"}}>
                        Welcome to Stride!
                    </h1>
                    <Divider></Divider>
                    <p style={{textAlign:"center", margin:"60px 0px", fontSize:"16px"}}>
                    Dolore proident sit excepteur et. Reprehenderit minim anim ut proident pariatur in. 
                    Lorem excepteur culpa consectetur do mollit cupidatat pariatur et tempor tempor fugiat.
                    </p>
                    <Divider></Divider>
                    <Container style={{textAlign:"center", marginTop:"60px"}}>
                    <Grid stackable >
                        <Grid.Row columns={3}>
                        <Grid.Column>
                        <Card as={NavLink} to='/jobs'>
                                <Image src={require('../../assets/jobs.jpg')} wrapped ui={false} />
                                <Card.Content>
                                <Card.Header>Explore Jobs</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Jobs</span>
                                </Card.Meta>
                                <Card.Description>
                                    Nisi elit commodo occaecat ut exercitation minim qui laborum eu.
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name='briefcase' />
                                       300+ jobs
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card as={NavLink} to='/internships'>
                                <Image src={require('../../assets/internships.jpg')} wrapped ui={false} />
                                <Card.Content>
                                <Card.Header>Explore Internships</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Internships</span>
                                </Card.Meta>
                                <Card.Description>
                                    Nisi elit commodo occaecat ut exercitation minim qui laborum eu.
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name='graduation cap' />
                                    100+ internships
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                        <Card as={NavLink} to='/projects'>
                                <Image src={require('../../assets/projects.jpg')} wrapped ui={false} />
                                <Card.Content>
                                <Card.Header>Explore Projects</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Projects</span>
                                </Card.Meta>
                                <Card.Description>
                                    Nisi elit commodo occaecat ut exercitation minim qui laborum eu.
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name='laptop' />
                                        50+ projects
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
    console.log(state);
    return{
        firstAccess: state.firebase.profile.firstAccess
}}

export default connect(mapStateToProps,null)(Home);