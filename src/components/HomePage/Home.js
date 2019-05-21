import { Button, Container } from 'semantic-ui-react';

import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom'
import React from 'react';

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
                <Container  style={{width:"100%",height:"100%"}}>
                    <h1 style={{textAlign:"center",marginRight:"250px",marginTop:"50px"}}>
                        Ovde oglasi idu!
                    </h1>
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