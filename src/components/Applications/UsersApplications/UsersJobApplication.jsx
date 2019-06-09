import {Button, Container,Form,Checkbox,TextArea,Select, Confirm,Image } from 'semantic-ui-react';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux' 
import React from 'react';
import {connect} from 'react-redux';
import {createJob} from '../../../store/actions/jobAction'
import Spinner from '../../../Spinner'


class UsersJobApplication extends React.Component{

    render(){
        const {userApplications} = this.props;
        
        if(userApplications!==null) {
            return(
                <Container style={{marginTop:"7em"}}>
                    <h1 style={{textAlign:"center",fontSize:"30px", fontFamily:"Nexa Bold"}}> Applications for this job </h1>
                   
                        <Container style={{textAlign:"center",marginTop:"30px"}}>
                            {
                                userApplications===undefined?
                                <Spinner/>
                                :
                                userApplications.length===0?
                                <h3>There is no applications yet.</h3>
                                :
                                userApplications.map((userProfile)=>{
                                return(
                                    <div key={userProfile.userId} style={{display:'flex',verticalAlign:"middle",alignItems:"center",justifyContent:"space-between" ,borderLeft:"10px solid #03254c",background:"white", margin:"20px 0px", padding:"20px 20px"}}>
                                        <p style={{fontSize:"20px",margin:"0px"}}>{userProfile.userName}</p>
                                        <p style={{fontSize:"20px",margin:"0px"}}>{userProfile.userEmail}</p>
                                        <div>Resume  <Image src={require("../../../assets/icon2.png")} as='a' href={userProfile.resumeUrl} target="_blank" ></Image></div>
                                    </div>
                                    )
                                })
                            }
                        </Container>
                </Container>
            )
        }
        else {
            return <Spinner />;
        }
    }
}


const mapStateToProps = (state, ownProps) => {

    const thisJobId = ownProps.match.params.id;

    return {
        jobId:thisJobId,
        userApplications:state.firestore.ordered.userApplications
    }
}

export default compose(
    connect(mapStateToProps,null),
    firestoreConnect((props)=>[
        {
            collection:'jobs',
            doc:props.jobId,
            subcollections:[{collection:'userApplications'}],
            storeAs: 'userApplications'
        }
    ])
)(UsersJobApplication)
