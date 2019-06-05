import {Button, Container, Checkbox, Form, Card, Grid, Divider, Message } from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import { updateProfile } from '../../store/actions/updateProfile'

class UserProfile extends React.Component{
    state={
        userName: '',
        fullname: '',
        eMail: '',
        city: '',
        address: '',
        country: '',
        postcode: '',
        informations: '',
        errors: [],
        loading: false
    }

    isFormValid = () => {
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)) {
            error = { message: 'Fill in all fields'};
            this.setState({errors: errors.concat(error)});
            return false;
        }
        else {
            return true;
        }
    }
    
    isFormEmpty = ({userName, fullname ,eMail,city,address,country,postcode,informations}) => {
        return !userName.length || !fullname.length || !eMail.length || 
        !city.length || !address.length || !country.length || !postcode.length || !informations.length;
    }
    
    updateProfile=()=>{
        console.log(this.state);
        this.props.updateProfile(this.state);
    }
    
    handleChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value
        });
    }

    displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>);
    
    handleSubmit = event => {
        event.preventDefault();
        if(this.isFormValid()) {
            this.setState({errors: [], loading: true});
            this.updateProfile();

            setTimeout(()=>{ 
                if(this.props.error!==null){
                    this.setState({
                        errors:this.state.errors.concat(this.props.error),
                        loading: false                
                    });
            }},1000);
        }
    }

    render(){
        const { userName, fullname, eMail, city, address, country, postcode, informations, errors, loading } = this.state;
        return(                

            <Container style={{marginTop:"7em"}}>
                <h1 style={{textAlign:"center", fontSize:"30px", fontFamily:"Nexa"}}> User info </h1>

                <Container style={{textAlign:"left",marginTop:"30px"}}>
                {errors.length > 0 && (
                    <Message error>
                        <h3>Error</h3>
                        {this.displayErrors(errors)}
                    </Message>
                )}
                <Form onSubmit={this.handleSubmit}>
                <Card fluid style={{padding:"40px", marginBottom:"50px"}}>
                    <Form.Field >
                        <Form.Input fluid label={"Username:"} name="userName" placeholder={this.props.SuserName} value={userName} type="text" onChange={this.handleChange}  style={{marginTop:"5px"}} />
                    </Form.Field>
                    <Grid stackable >
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Form.Field style={{marginTop:"15px"}}>
                                    <Form.Input fluid label={"Full name:"} name="fullname" placeholder={this.props.Sfullname} value={fullname} type="text" onChange={this.handleChange} style={{marginTop:"5px"}} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field style={{marginTop:"15px"}}>
                                    <Form.Input fluid label={"Email:"} name="eMail" placeholder={this.props.SeMail} value={eMail} type="text" onChange={this.handleChange}  style={{marginTop:"5px"}} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Divider style={{marginTop:"30px"}}></Divider>
                    <Form.Field style={{marginTop:"10px"}}>
                        <Form.Input fluid name="address" label={"Address:"} placeholder={this.props.Saddress} value={address} type="text" onChange={this.handleChange} style={{marginTop:"5px"}} />
                    </Form.Field>
                    <Grid stackable >
                        <Grid.Row columns={3}>
                            <Grid.Column>
                            <Form.Field style={{marginTop:"15px"}}>
                                <Form.Input fluid name="city" label={"City:"} placeholder={this.props.Scity} value={city} type="text" onChange={this.handleChange} style={{marginTop:"5px"}} />
                            </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                            <Form.Field style={{marginTop:"15px"}}>
                                <Form.Input fluid name="country" label={"Country:"} placeholder={this.props.Scountry} value={country} type="text" onChange={this.handleChange} style={{marginTop:"5px"}} />
                            </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                            <Form.Field style={{marginTop:"15px"}}>
                                <Form.Input fluid name="postcode" label={"Postcode:"} placeholder={this.props.Spostcode} value={postcode} type="text" onChange={this.handleChange} style={{marginTop:"5px"}} />
                            </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Divider style={{marginTop:"30px"}}></Divider>
                    <Form.Field style={{marginTop:"15px"}}>
                        <Form.TextArea rows={3} name="informations" label={"About me:"} placeholder={this.props.Sinformations} value={informations} type="text" onChange={this.handleChange} style={{marginTop:"5px"}} />
                    </Form.Field>                
                
                    <Button style={{marginTop:"15px", background:"#d0efff"}}>Submit</Button>
                </Card>
                </Form>
                
                </Container>
            </Container>
            )  

    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        updateProfile:(userINFO)=>dispatch(updateProfile(userINFO))
    }
}

const mapStateToProps=(state)=>{
    console.log(state);
    return{
        SuserName: state.firebase.profile.name,
        Sfullname: state.firebase.profile.fullname,
        SeMail: state.firebase.profile.eMail,
        Saddress: state.firebase.profile.address,
        Scity: state.firebase.profile.city,
        Scountry: state.firebase.profile.country,
        Spostcode: state.firebase.profile.postcode,
        Sinformations: state.firebase.profile.informations,
        error: state.auth.authError
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);
