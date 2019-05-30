import { Button, Container } from 'semantic-ui-react';
import {Link } from 'react-router-dom'
import Spinner from '../../../Spinner'

import React from 'react';

class InternshipList extends React.Component{
    render(){
        if(this.props.listOfInternships===undefined){ // undefine je sasvim malo dok se ne ucitaju podaci iz roditelja
            return  <Spinner/>;
        }else{ 
            return(
                <div>
                    {this.props.listOfInternships.map((internship)=>{
                            return (
                            <div key={internship.id} style={{textAlign:"center",marginRight:"250px",height:"150px",     marginTop:"5px",borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                                <h3>{internship.title}</h3>
                                <Link to={`internshipdetail/${internship.id}`}>
                                    <Button>
                                        internship Details
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

export default InternshipList;