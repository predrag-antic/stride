import { Button, Container, Grid, Card, Divider } from 'semantic-ui-react';
import {Link } from 'react-router-dom'
import Spinner from '../../../Spinner'
import moment from 'moment'

import React from 'react';

class JobList extends React.Component{
    render(){
        if(this.props.listOfJobs===undefined){ // undefine je sasvim malo dok se ne ucitaju podaci iz roditelja
            return  <Spinner/>;
        }else{ 
            return(
                    <Grid stackable >
                        <Grid.Row columns={3}>
                        {this.props.listOfJobs.map((job)=>{
                                return (
                                    <Grid.Column key={job.id}>
                                        <Card color={job.isAvailable?"blue":"red"} fluid key={job.id} style={{ marginBottom:"30px", padding:"20px 10px"}}>
                                            {/* <Image circular src={require("../../../assets/jobs.jpg")}></Image> */}
                                            <Card.Header style={{marginBottom:"10px", marginTop:"10px", fontSize:"20px",fontWeight:"600"}}>{job.title}</Card.Header>
                                            <Divider style={{marginBottom:"20px"}}></Divider>
                                            <div>
                                                <Link to={`job-detail/${job.id}`} style={{color:"red"}} > 
                                                    <Button style={{verticalAlign:"bottom", width:"100px", marginTop:"0px", background:"#d0efff"}}>
                                                    Details
                                                    </Button>
                                                </Link>
                                            </div >
                                            <p style={{marginTop:"20px"}}>Published by:
                                                <Link to = {'/company-detail/' + job.authorId} style={{marginLeft:"5px"}}>
                                                    {job.jobAuthorName}
                                                </Link>
                                            </p>
                                            <p>{moment(job.createdAt.toDate()).format('MMMM Do YYYY / h:mm:ss a')}</p>
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

export default JobList;