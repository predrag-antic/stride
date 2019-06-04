import {Button, Container, Checkbox, Form, Card, Grid, Divider } from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import { updateProfile } from '../../store/actions/updateProfile'

class UserProfile extends React.Component{
    state={
        popunioProfil:true,
        userName: '',
        lastname: '',
        city: '',
        address: '',
        country: '',
        postcode: '',
        informations: ''
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
    
    render(){
        const { popunioPrifil, userName, lastname, city, address, country, postcode, informations } = this.state;
        return(                

            <Container style={{marginTop:"7em"}}>
                <h1 style={{textAlign:"center", fontSize:"30px", fontFamily:"Nexa"}}> User info </h1>

                <Container style={{textAlign:"left",marginTop:"30px"}}>
                <Card fluid style={{padding:"40px", marginBottom:"50px"}}>
                    <Form.Field >
                        <Form.Input fluid label={"Usrname:"} name="userName" placeholder={this.props.SuserName} value={userName} type="text" onChange={this.handleChange} style={{marginTop:"5px"}} />
                    </Form.Field>
                    <Form.Field style={{marginTop:"30px"}}>
                        <Form.Input fluid label={"Full name:"} name="lastname" placeholder={this.props.Slastname} value={lastname} type="text" onChange={this.handleChange} style={{marginTop:"5px"}} />
                    </Form.Field>
                    <Divider style={{marginTop:"30px"}}></Divider>
                    <Form.Field style={{marginTop:"10px"}}>
                        <Form.Input fluid name="address" label={"Address:"} placeholder={this.props.Saddress} value={address} type="text" onChange={this.handleChange} style={{marginTop:"5px"}} />
                    </Form.Field>
                    <Grid stackable >
                        <Grid.Row columns={3}>
                            <Grid.Column>
                            <Form.Field style={{marginTop:"30px"}}>
                                <Form.Input fluid name="city" label={"City:"} placeholder={this.props.Scity} value={city} type="text" onChange={this.handleChange} style={{marginTop:"5px"}} />
                            </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                            <Form.Field style={{marginTop:"30px"}}>
                                <Form.Input fluid name="country" label={"Country:"} placeholder={this.props.Scountry} value={country} type="text" onChange={this.handleChange} style={{marginTop:"5px"}} />
                            </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                            <Form.Field style={{marginTop:"30px"}}>
                                <Form.Input fluid name="postcode" label={"Postcode:"} placeholder={this.props.Spostcode} value={postcode} type="text" onChange={this.handleChange} style={{marginTop:"5px"}} />
                            </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Divider style={{marginTop:"30px"}}></Divider>
                    <Form.Field style={{marginTop:"20px"}}>
                        <Form.Input fluid name="informations" label={"Skills:"} placeholder={this.props.Sinformations} value={informations} type="text" onChange={this.handleChange} style={{marginTop:"5px"}} />
                    </Form.Field>                
                
                    <Button onClick={this.updateProfile} style={{marginTop:"30px"}}>Submit</Button>
                </Card>

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
        SuserName:state.firebase.profile.name,
        Slastname: state.firebase.profile.lastname,
        Saddress: state.firebase.profile.address,
        Scity: state.firebase.profile.city,
        Scountry: state.firebase.profile.country,
        Spostcode: state.firebase.profile.postcode,
        Sinformations: state.firebase.profile.informations

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);
