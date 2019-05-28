import {Button, Form, Container} from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import { updateProfile } from '../../store/actions/updateProfile'

class Company extends React.Component{
    state={
        popunioProfil:true,
        companyName: '',
        established: '',
        address: '',
        website: '',
        eMail: '',
        phoneNumber: ''
    }

    updateProfile=()=>{
        console.log(this.state)
        this.props.updateProfile(this.state);
    }

    handleSubmit =(e) => {
        e.preventDefault();
        console.log(this.state);
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.id]: e.target.value
        })
    }
    
    render(){
        const {popunioProfil, companyName, established, address, website, phoneNumber, eMail} = this.state;
        return (
            <Container style={{width: '100%', height:'100%'}}>
                <h1 style={{ color: '#4c3c4c', fontWeight: 'bold', fontSize: 50, textAlign:'center', marginRight: 250}}>Company info</h1>
                <Container style={{textAlign: 'center', marginTop: '50px'}}>
                    <Form onSubmit={this.handleSubmit} style={{marginRight: 250}}>
                        <Form.Field style={{marginBottom: 50}}>
                            <label style={{color: '#4c3c4c', fontWeight: 'bolder', fontSize: 25}}>Name</label>
                            <input id="companyName" type="text" placeholder={this.props.CName} onChange={this.handleChange} focus style={{width: '75%'}}/>
                        </Form.Field>
                        <Form.Field style={{marginBottom: 50}}>
                            <label style={{color: '#4c3c4c', fontWeight: 'bolder', fontSize: 25}}>Established</label>
                            <input id="established" type="text" placeholder={this.props.CEstablished} onChange={this.handleChange} focus style={{width: '75%'}} />
                        </Form.Field>
                        <Form.Field style={{marginBottom: 50}}>
                            <label style={{color: '#4c3c4c', fontWeight: 'bolder', fontSize: 25}}>Address</label>
                            <input id="address" type="text" placeholder={this.props.CAddress} onChange={this.handleChange} focus style={{width: '75%'}} />
                        </Form.Field>
                        <Form.Field style={{marginBottom: 50}}>
                            <label style={{color: '#4c3c4c', fontWeight: 'bolder', fontSize: 25}}>Website</label>
                            <input id="website" type="text" placeholder={this.props.CWebsite} onChange={this.handleChange} focus style={{width: '75%'}} />
                        </Form.Field>
                        <Form.Field style={{marginBottom: 50}}>
                            <label style={{color: '#4c3c4c', fontWeight: 'bolder', fontSize: 25}}>E-mail</label>
                            <input id="eMail" type="text" placeholder={this.props.CEmail} onChange={this.handleChange} focus style={{width: '75%'}} />
                        </Form.Field>
                        <Form.Field style={{marginBottom: 50}}>
                            <label style={{color: '#4c3c4c', fontWeight: 'bolder', fontSize: 25}}>Phone number</label>
                            <input id="phoneNumber" type="text" placeholder={this.props.CPhoneNumber} onChange={this.handleChange} focus style={{width: '75%'}} />
                        </Form.Field>
                        <Button type="submit" onClick={this.updateProfile} style={{ color: 'white', border: 'black', background: '#4c3c4c'}}>Submit</Button>
                    </Form>
                </Container>
            </Container>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        updateProfile:(companyInfo)=>dispatch(updateProfile(companyInfo))
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        CName: state.firebase.profile.companyName,
        CEstablished: state.firebase.profile.established,
        CAddress: state.firebase.profile.address,
        CEmail: state.firebase.profile.eMail,
        CPhoneNumber: state.firebase.profile.phoneNumber,
        CWebsite: state.firebase.profile.website
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Company);