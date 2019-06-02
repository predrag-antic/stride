import { Button, Container } from 'semantic-ui-react';
import {Link } from 'react-router-dom'
import Spinner from '../../Spinner'
import moment from 'moment'

import React from 'react';

class MyInternshipApplicationsList extends React.Component{
    render(){

        const {listOfMyInternshipApplications} =this.props;

        if(listOfMyInternshipApplications===undefined || listOfMyInternshipApplications===null){ // undefine je sasvim malo dok se ne ucitaju podaciizroditelja
            return  <Spinner/>;
        }else{ 
            return(
                <div>
                    {
                        this.props.listOfMyInternshipApplications.map((myApplication)=>{
                            return (
                            <div key={myApplication.internshipId} style={{textAlign:"center",marginRight:"250px",height:"150px",     marginTop:"5px",borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                                <h3>{myApplication.internshipTitle}</h3>
                                <Link to={`internshipdetail/${myApplication.internshipId}`}>
                                    <Button>
                                        Internship Details
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

export default MyInternshipApplicationsList;