import { Button, Container } from 'semantic-ui-react';

import MyJobApplicationsList from './MyJobApplicationsList'

import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';


import React from 'react';

class MyJobApplicationsPage extends React.Component{

    render(){
        const {myJobApplications}=this.props;
        return(
            <Container style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px"}}> My Job Applications </h1>
                <Container style={{textAlign:"center",marginTop:"50px",width:"100%",height:"100%"}}>
                    <Container >
                        <MyJobApplicationsList listOfMyJobApplications={myJobApplications}>
                        </MyJobApplicationsList>
                        <h3>Lista poslova za koje je user prijavljen!</h3>
                    </Container>
                </Container>
            </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        firebaseConn:state.firebase,
        myJobApplications:state.firestore.ordered.myJobApplications
    }
}

export default compose(connect(mapStateToProps,null),
    firestoreConnect(props=>[
        {
        collection:'profiles',
        doc:props.firebaseConn.auth.uid,
        subcollections:[{collection:'myJobApplications'}],
        storeAs: 'myJobApplications'
        }
]))(MyJobApplicationsPage);