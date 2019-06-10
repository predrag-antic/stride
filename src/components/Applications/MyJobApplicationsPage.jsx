import {  Container } from 'semantic-ui-react';

import MyJobApplicationsList from './MyJobApplicationsList'

import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';


import React from 'react';

class MyJobApplicationsPage extends React.Component{

    render(){
        const {myJobApplications}=this.props;
        return(
            <Container>
                <h1 style={{textAlign:"center",fontSize:"30px", fontFamily:"Nexa Bold"}}> My Job Applications </h1>
                {
                    myJobApplications!==undefined && myJobApplications.length===0?
                    <Container style={{textAlign:"center",marginTop:"50px"}}>
                        <h3>You have not applied for any job jet.</h3>
                    </Container>
                    :
                    <Container style={{textAlign:"center",marginTop:"50px"}}>
                        <Container >
                            <MyJobApplicationsList listOfMyJobApplications={myJobApplications}>
                            </MyJobApplicationsList>
                        </Container>
                    </Container>
                }
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