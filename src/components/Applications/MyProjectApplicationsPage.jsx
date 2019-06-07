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
            <Container style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px"}}> My Project Applications </h1>
                <Container style={{textAlign:"center",marginTop:"50px",width:"100%",height:"100%"}}>
                    <Container >
                        <MyProjectApplicationsList listOfMyProjectApplications={myProjectApplications}>
                        </MyProjectApplicationsList>
                        <h3>Lista projekata za koje je user prijavljen!</h3>
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