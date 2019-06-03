import { Button, Container } from 'semantic-ui-react';
import {Link } from 'react-router-dom'
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
                <div>
                    {
                        this.props.listOfMyJobApplications.map((myJobApplication)=>{
                            return (
                            <div key={myJobApplication.jobId} style={{textAlign:"center",marginRight:"250px",height:"150px",     marginTop:"5px",borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                                <h3>{myJobApplication.jobTitle}</h3>
                                <Link to={`job-detail/${myJobApplication.jobId}`}>
                                    <Button>
                                        Job Details
                                    </Button>
                                </Link>
                            </div>
                            )
                        })
                    }
                </div>
                )
            }
        }
    }

export default MyJobApplicationsList;