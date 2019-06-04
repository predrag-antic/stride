import { Button, Container } from 'semantic-ui-react';

import InternshipList from './InternshipList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';


import React from 'react';

class InternshipPage extends React.Component{

    render(){
        const {internships}=this.props;
        return(
            <Container style={{width:"100%",height:"100%",marginTop:"5em"}}>
                <h1 style={{textAlign:"center"}}> Internships PAGE </h1>
                <Container style={{textAlign:"center",width:"100%",height:"100%"}}>
                    <Container >
                        <InternshipList listOfInternships={internships}>

                        </InternshipList>
                    </Container>
                </Container>
            </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log(state);
    return{
        internships:state.firestore.ordered.internships
    }
}

export default compose(connect(mapStateToProps,null),
    firestoreConnect([{
        collection:'internships',
        orderBy:['createdAt','desc']
    }]))(InternshipPage);