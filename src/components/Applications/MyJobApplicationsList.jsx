import { Button, Container } from 'semantic-ui-react';
import {NavLink } from 'react-router-dom'
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
                            <div key={myJobApplication.jobId} style={{borderLeft:"10px solid #03254c",background:"white", textAlign:"center",verticalAlign:"middle", margin:"20px 0px", padding:"20px 5px"}}>
                                <h3 >{myJobApplication.jobTitle}</h3>
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