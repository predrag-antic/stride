import { Button, Container, Grid, Card, Divider } from 'semantic-ui-react';
import {Link } from 'react-router-dom'
import Spinner from '../../../Spinner'
import moment from 'moment'

import React from 'react';

class InternshipList extends React.Component{
    render(){
        if(this.props.listOfInternships===undefined){ // undefine je sasvim malo dok se ne ucitaju podaci iz roditelja
            return  <Spinner/>;
        }else{ 
            return(
                <Grid stackable >
                    <Grid.Row columns={3}>
                    {this.props.listOfInternships.map((internship)=>{
                            return (
                                <Grid.Column key={internship.id}>
                                    <Card color='blue' fluid key={internship.id} style={{ marginBottom:"30px", padding:"20px 10px"}}>    
                                        {/* <Image circular src={require("../../../assets/jobs.jpg")}></Image> */}
                                        <Card.Header style={{marginBottom:"10px", marginTop:"10px", fontSize:"20px",fontWeight:"600"}}>{internship.title}</Card.Header>
                                        <Divider style={{marginBottom:"20px"}}></Divider> 
                                        <div>
                                            <Link to={`internship-detail/${internship.id}`} style={{color:'black'}}> 
                                                <Button style={{verticalAlign:"bottom", width:"100px", marginTop:"0px", background:"#d0efff"}}>
                                                Details
                                                </Button>
                                            </Link>
                                        </div >
                                        <p style={{marginTop:"20px"}}>Published by:
                                                <Link to = {'/company-detail/' + internship.authorId} style={{marginLeft:"5px"}}>
                                                    {internship.internshipAuthorName}
                                                </Link>
                                            </p>
                                        <p>{moment(internship.createdAt.toDate()).format('MMMM Do YYYY h:mm:ss a')}</p>
                                    </Card>
                                </Grid.Column>
                            )
                    })}
                    </Grid.Row>
                </Grid>
            )
            }
        
    }
}

export default InternshipList;