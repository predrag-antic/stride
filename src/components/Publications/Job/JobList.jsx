import { Button, Container } from 'semantic-ui-react';
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
                <div>
                    {this.props.listOfJobs.map((job)=>{
                            return (
                            <div key={job.id} style={{textAlign:"center",marginRight:"250px",height:"150px",marginTop:"5px",
                            borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                                <h3>{job.title}</h3>
                                <Link to = {'/company-detail/' + job.authorId}>
                                    <p>Published by: {job.jobAuthorName} </p>
                                </Link>
                                <p>Published:  {moment(job.createdAt).format('MMMM Do YYYY h:mm:ss a')}</p>
                                <Link to={`job-detail/${job.id}`}>
                                    <Button>
                                        Details
                                    </Button>
                                </Link>
                            </div>
                            )
                    })}
                </div>
            )
            }
        
    }
}

export default JobList;