
import React from 'react'
import { Container, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
 
const CompanyDetails = (props) => {
    const { profile } = props; 
    if (profile) {
        return (
            <Container style={{width: '100%', height:'100%'}}>
                <h1 style={{ color: '#187bcd', fontWeight: 'bold', fontSize: 50, textAlign:'center', marginRight: 250}}>Company info</h1>
                <Container style={{textAlign: 'center', marginTop: '50px', marginRight: 250}}>
                    <Form style={{marginRight: 250}}>
                        <Form.Field style={{marginBottom: 50}}>
                            <label style={{color: '#187bcd', fontWeight: 'bolder', fontSize: 25, marginBottom: 50}}>Name: {profile.companyName}</label>
                        </Form.Field>
                        <Form.Field style={{marginBottom: 50}}>
                            <label style={{color: '#187bcd', fontWeight: 'bolder', fontSize: 25, marginBottom: 50}}>Established: {profile.established}</label>
                        </Form.Field>
                        <Form.Field style={{marginBottom: 50}}>
                            <label style={{color: '#187bcd', fontWeight: 'bolder', fontSize: 25, marginBottom: 50}}>Address: {profile.address}</label>
                        </Form.Field>
                        <Form.Field style={{marginBottom: 50}}>
                            <label style={{color: '#187bcd', fontWeight: 'bolder', fontSize: 25, marginBottom: 50}}>Website: {profile.website}</label>
                        </Form.Field>
                        <Form.Field style={{marginBottom: 50}}>
                            <label style={{color: '#187bcd', fontWeight: 'bolder', fontSize: 25, marginBottom: 50}}>E-mail: {profile.eMail}</label>
                        </Form.Field>
                        <Form.Field style={{marginBottom: 50}}>
                            <label style={{color: '#187bcd', fontWeight: 'bolder', fontSize: 25}}>Phone number: {profile.phoneNumber}</label>
                        </Form.Field>
                    </Form>
                </Container>
            </Container> 
        )
    }
    else {
        return (
            <div style={{textAlign: 'center', marginRight: 250}}>
                <p>Loading company info...</p>
            </div>
            )
    }
}

const mapStateToProps = (state, ovdeProps) => {
    const id = ovdeProps.match.params.id;
    const profiles = state.firestore.data.profiles;
    const profile = profiles ? profiles[id] : null
    return {
         profile: profile,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'profiles' }
    ])
)(CompanyDetails)