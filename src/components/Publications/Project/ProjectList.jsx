import { Button, Grid, Card, Divider } from 'semantic-ui-react';
import {Link } from 'react-router-dom'
import Spinner from '../../../Spinner'
import moment from 'moment'

import React from 'react';

class ProjectList extends React.Component{
    render(){
        if(this.props.listOfProjects===undefined){ // undefine je sasvim malo dok se ne ucitaju podaci iz roditelja
            return  <Spinner/>;
        }else{ 
            return(
                <div>
                    <Grid stackable >
                        <Grid.Row columns={3}>
                        {this.props.listOfProjects.map((project)=>{
                                return (
                                    <Grid.Column key={project.id}>
                                        
                                        <Card color={project.isAvailable?"blue":"red"} fluid key={project.id} style={{ marginBottom:"30px", padding:"20px 10px"}}>
                                            {/* <Image circular src={require("../../../assets/projects.jpg")}></Image> */}
                                            <Card.Header style={{marginBottom:"10px", marginTop:"10px", fontSize:"20px",fontWeight:"600"}}>{project.title}</Card.Header>
                                            <Divider style={{marginBottom:"20px"}}></Divider>
                                            <div>
                                                <Link to={`project-detail/${project.id}`} style={{color:"red"}} > 
                                                    <Button style={{verticalAlign:"bottom", width:"100px", marginTop:"0px", background:"#d0efff"}}>
                                                    Details
                                                    </Button>
                                                </Link>
                                            </div >
                                            <p style={{marginTop:"20px"}}>Published by:
                                                <Link to = {'/user-detail/' + project.authorId} style={{marginLeft:"5px"}}>
                                                    {project.projectAuthorName}
                                                </Link>
                                            </p>
                                            <p>{moment(project.createdAt.toDate()).format('MMMM Do YYYY / h:mm:ss a')}</p>
                                        </Card>
                                    </Grid.Column>
                                )
                        })}
                        </Grid.Row>
                    </Grid>
                </div>
            )
            }
        
    }
}

export default ProjectList;