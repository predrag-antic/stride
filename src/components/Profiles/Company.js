import {Button, Form, Container, Card, Grid} from 'semantic-ui-react';

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
            [e.target.name]: e.target.value
        })
    }
    
    render(){
        const {popunioProfil, companyName, established, address, website, phoneNumber, eMail} = this.state;
        return (
            <Container style={{marginTop:"7em"}}>
                <h1 style={{textAlign:"center", fontSize:"30px", fontFamily:"Nexa"}}>Company info</h1>

                <Container style={{textAlign:"left", marginTop:"30px"}}>
                <Card fluid style={{padding:"40px", marginBottom:"50px"}}>
                        <Form.Field >
                            <Form.Input fluid name="companyName" label={"Name:"} type="text" placeholder={this.props.CName} onChange={this.handleChange}  style={{marginTop:"5px"}}/>
                        </Form.Field>
                        <Form.Field style={{marginTop:"30px"}}>
                            <Form.Input fluid name="website" type="text" label={"Website:"} placeholder={this.props.CWebsite} onChange={this.handleChange}  style={{marginTop:"5px"}} />
                        </Form.Field>
                        <Grid stackable >
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Form.Field style={{marginTop:"30px"}}>
                                        <Form.Input fluid name="established" type="text" label={"Established:"} placeholder={this.props.CEstablished} onChange={this.handleChange} style={{marginTop:"5px"}} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field style={{marginTop:"30px"}}>
                                        <Form.Input fluid name="eMail" type="text" label={"Email:"} placeholder={this.props.CEmail} onChange={this.handleChange}  style={{marginTop:"5px"}} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Form.Field style={{marginTop:"30px"}}>
                            <Form.Input fluid name="address" type="text" label={"Address:"} placeholder={this.props.CAddress} onChange={this.handleChange}  style={{marginTop:"5px"}} />
                        </Form.Field>
                        <Form.Field style={{marginTop:"30px"}}>
                            <Form.Input fluid name="phoneNumber" type="text" label={"Phone:"} placeholder={this.props.CPhoneNumber} onChange={this.handleChange}  style={{marginTop:"5px"}} />
                        </Form.Field>

                        <Button type="submit" onClick={this.updateProfile} style={{marginTop:"30px"}}>Submit</Button>
                    
                </Card>
                </Container>
            </Container>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        updateProfile:(profileInfo)=>dispatch(updateProfile(profileInfo))
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