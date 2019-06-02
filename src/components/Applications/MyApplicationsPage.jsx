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
            <Container style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px"}}> My Applications </h1>
                <Container style={{textAlign:"center",marginTop:"50px",width:"100%",height:"100%"}}>
                    <Container >
                        <MyInternshipApplicationsList listOfMyInternshipApplications={myIntApplications}>
                        </MyInternshipApplicationsList>
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