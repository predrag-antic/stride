import { Button, Container } from 'semantic-ui-react';
import {Link,NavLink } from 'react-router-dom'
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
                            <div key={myProjectApplication.projectId} style={{borderLeft:"10px solid #03254c",background:"white", textAlign:"center",verticalAlign:"middle", margin:"20px 0px", padding:"20px 5px"}}>
                                <h3>{myProjectApplication.projectTitle}</h3>
                                    <Button as={NavLink} to={`project-detail/${myProjectApplication.projectId}`} style={{textAlign:"center", background:"#d0efff"}}>
                                        Project Details
                                    </Button>
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