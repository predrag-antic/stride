import { Button, Container } from 'semantic-ui-react';
import {Link,NavLink } from 'react-router-dom'
import Spinner from '../../Spinner'
import moment from 'moment'

import React from 'react';

class MyJobApplicationsList extends React.Component{
    render(){

        const {listOfMyJobApplications} =this.props;

        if(listOfMyJobApplications===undefined || listOfMyJobApplications===null){ // undefine je sasvim malo dok se ne ucitaju podaciizroditelja
            return  <Spinner/>;
        }else{ 
            return(
                        this.props.listOfMyJobApplications.map((myJobApplication)=>{
                            return (
                            <div key={myJobApplication.jobId} style={{borderLeft:"10px solid #03254c",background:"white", textAlign:"center", height:"120px", marginTop:"20px",verticalAlign:"middle"}}>
                                <h3 style={{paddingTop:"20px"}}>{myJobApplication.jobTitle}</h3>
                                    <Button as={NavLink} to={`job-detail/${myJobApplication.jobId}`} style={{textAlign:"center", background:"#d0efff"}}>
                                        Job Details
                                    </Button>
                                
                            </div>
                            )
                        })
                    
                )
            }
        }
    }

export default MyJobApplicationsList;