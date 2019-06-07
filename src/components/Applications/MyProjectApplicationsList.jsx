import { Button, Container } from 'semantic-ui-react';
import {Link } from 'react-router-dom'
import Spinner from '../../Spinner'
import moment from 'moment'

import React from 'react';

class MyProjectApplicationsList extends React.Component{
    render(){

        const {listOfMyProjectApplications} =this.props;

        if(listOfMyProjectApplications===undefined || listOfMyProjectApplications===null){ // undefine je sasvim malo dok se ne ucitaju podaciizroditelja
            return  <Spinner/>;
        }else{ 
            return(
                <div>
                    {
                        this.props.listOfMyProjectApplications.map((myProjectApplication)=>{
                            return (
                            <div key={myProjectApplication.projectId} style={{textAlign:"center",marginRight:"250px",height:"150px",     marginTop:"5px",borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                                <h3>{myProjectApplication.projectTitle}</h3>
                                <Link to={`project-detail/${myProjectApplication.projectId}`}>
                                    <Button>
                                        Project Details
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

export default MyProjectApplicationsList;