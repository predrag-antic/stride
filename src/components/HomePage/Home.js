import { Button, Container } from 'semantic-ui-react';

import {connect} from 'react-redux';
import React from 'react';
import {Link} from 'react-router-dom';

import Welcome from './Welcome';
import Spinner from '../../Spinner'

class Home extends React.Component{

    render(){

        const { firstAccess }=this.props;

        if(firstAccess===undefined){ // undefine je sasvim malo dok se ne ucitaju podaci iz firebase/profile-a
            console.log(firstAccess);
            return  <Spinner/>;
        }else if(firstAccess===true){
            return  <Welcome/>
        }else{
            return (
                <Container  style={{paddingRight:"250px",width:"100%",height:"100%"}}>
                    <h1 style={{textAlign:"center"}}>
                        EXPLORE JOBS/INTERNSHIP/PROJECTS
                    </h1>
                    <Container style={{textAlign:"center"}}>
                        <Container>
                            <Link to="/jobs" >
                                EXPLORE JOBS
                            </Link>
                        </Container>
                        <Container >
                            <Link to="/internships" >
                                EXPLORE INTERNSHIP
                            </Link>
                        </Container>
                        <Container>
                            <Link to="/projects">
                                EXPLORE PROJECTS
                            </Link>
                        </Container>
                    </Container>
                </Container>
            )
        }
    }
}

const mapStateToProps=state=>{
    console.log(state);
    return{
        firstAccess: state.firebase.profile.firstAccess
}}

export default connect(mapStateToProps,null)(Home);