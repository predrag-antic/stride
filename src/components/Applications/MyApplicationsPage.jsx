import { Button, Container } from 'semantic-ui-react';

import MyInternshipApplicationsList from './MyInternshipApplicationsList'

import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';


import React from 'react';

class MyApplicationsPage extends React.Component{

    render(){
        const {myIntApplications}=this.props;
        return(
            <Container>
                <h1 style={{textAlign:"center",fontSize:"30px", fontFamily:"Nexa Bold"}}> My Internship Applications </h1>
                <Container style={{textAlign:"center",marginTop:"50px"}}>
                    <Container >
                        <MyInternshipApplicationsList listOfMyInternshipApplications={myIntApplications}>
                        </MyInternshipApplicationsList>
                    </Container>
                </Container>
            </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        firebaseConn:state.firebase,
        myIntApplications:state.firestore.ordered.myInternshipApplications
    }
}

export default compose(connect(mapStateToProps,null),
    firestoreConnect(props=>[
        {
        collection:'profiles',
        doc:props.firebaseConn.auth.uid,
        subcollections:[{collection:'myInternshipApplications'}],
        storeAs: 'myInternshipApplications'
        }
]))(MyApplicationsPage);