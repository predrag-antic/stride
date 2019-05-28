import {Button, Container, Checkbox, Form } from 'semantic-ui-react';

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

            <Container style={{width:"100%",height:"100%"}}>
                <h1 style={{textAlign:"center",marginRight:"250px"}}> User info </h1>

                <Container style={{textAlign:"center",marginTop:"50px"}}>

                    <Form.Field style={{marginRight:"250px",textAlign:"left",marginTop:"30px"}}>
                        <label>Name: </label>
                        <Form.Input fluid name="userName" style={{maxWidth: 650}} placeholder={this.props.SuserName} value={userName} type="text" onChange={this.handleChange}/ >
                    </Form.Field>
                    <Form.Field style={{marginRight:"250px",textAlign:"left",marginTop:"30px"}}>
                        <label>Lastname: </label>
                        <Form.Input fluid name="lastname" style={{maxWidth: 650}} placeholder={this.props.Slastname} value={lastname} type="text" onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field style={{marginRight:"250px",textAlign:"left",marginTop:"30px"}}>
                        <label>City: </label>
                        <Form.Input fluid name="city" style={{maxWidth: 650}} placeholder={this.props.Scity} value={city} type="text" onChange={this.handleChange}/ >
                    </Form.Field>
                    <Form.Field style={{marginRight:"250px",textAlign:"left",marginTop:"30px"}}>
                        <label>Address: </label>
                        <Form.Input fluid name="address" style={{maxWidth: 650}} placeholder={this.props.Saddress} value={address} type="text" onChange={this.handleChange}/ >
                    </Form.Field>
                    <Form.Field style={{marginRight:"250px",textAlign:"left",marginTop:"30px"}}>
                        <label>Country: </label>
                        <Form.Input fluid name="country" style={{maxWidth: 650}} placeholder={this.props.Scountry} value={country} type="text" onChange={this.handleChange}/ >
                    </Form.Field>
                    <Form.Field style={{marginRight:"250px",textAlign:"left",marginTop:"30px"}}>
                        <label>Postcode: </label>
                        <Form.Input fluid name="postcode" style={{maxWidth: 650}} placeholder={this.props.Spostcode} value={postcode} type="text" onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field style={{marginRight:"250px",textAlign:"left",marginTop:"30px"}}>
                        <label>Skills: </label>
                        <Form.Input fluid name="informations" style={{maxWidth: 650}} placeholder={this.props.Sinformations} value={informations} type="text" onChange={this.handleChange}/>
                    </Form.Field>                
                
                    <Button onClick={this.updateProfile} style={{marginRight:"250px", marginTop:"30px"}}>Submit</Button>
                

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
