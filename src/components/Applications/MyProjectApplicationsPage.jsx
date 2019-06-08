import { Button, Container } from 'semantic-ui-react';

import MyProjectApplicationsList from './MyProjectApplicationsList'

import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';


import React from 'react';

class MyProjectApplicationsPage extends React.Component{

    render(){
        const {myProjectApplications}=this.props;
        return(
            <Container style={{marginTop:"7em"}}>
                <h1 style={{textAlign:"center",fontSize:"30px", fontFamily:"Nexa Bold"}}> My Project Applications </h1>
                <Container style={{textAlign:"center",marginTop:"50px"}}>
                    <Container >
                        <MyProjectApplicationsList listOfMyProjectApplications={myProjectApplications}>
                        </MyProjectApplicationsList>
                    </Container>
                </Container>
            </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        firebaseConn:state.firebase,
        myProjectApplications:state.firestore.ordered.myProjectApplications
    }
}

export default compose(connect(mapStateToProps,null),
    firestoreConnect(props=>[
        {
        collection:'profiles',
        doc:props.firebaseConn.auth.uid,
        subcollections:[{collection:'myProjectApplications'}],
        storeAs: 'myProjectApplications'
        }
]))(MyProjectApplicationsPage);