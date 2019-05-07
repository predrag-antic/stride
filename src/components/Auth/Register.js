import React from 'react';
import {Component} from 'react';
import firebase from '../../firebase';
import { Grid, Form, Segment, Button, Header, Message, Icon , Label, GridColumn } from 'semantic-ui-react';
import md5 from 'md5';
import { Link } from 'react-router-dom';
import gravatar from 'gravatar';

class Register extends React.Component {
    state = {
        userOrCompany:'',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false
    }

    isFormValid = () => {
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)){
            error = { message: 'Fill in all fields'};
            this.setState({errors: errors.concat(error)});
            return false;
        }
        else if(!this.isUserOrCompanyChosen(this.state)){
            error = { message: 'Please choose User or Company' };
            this.setState({errors: errors.concat(error)});
            return false;
        }
        else if (!this.isPasswordValid(this.state)){
            error = { message: 'Password is invalid' };
            this.setState({errors: errors.concat(error)});
            return false;
        }
        else {
            return true;
        }
    }
    
  
    isUserOrCompanyChosen=({userOrCompany})=>{
        return userOrCompany==''?false:true; 
    }

    isFormEmpty = ({username,email,password,passwordConfirmation}) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }

    isPasswordValid = ({password, passwordConfirmation}) => {
        if(password.length < 6 || passwordConfirmation.length < 6){
            return false;
        }
        else if(password !== passwordConfirmation){
            return false;
        }
        else {
            return true;
        }
    };

    displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>);

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.isFormValid()) {
            this.setState({errors: [], loading: true});
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(()=>this.addUserInfo())
            .catch(err => {
                console.error(err)
                this.setState({errors:this.state.errors.concat(err), loading: false})
            });
        }
    };

    addUserInfo = () => {
        console.log("Calling addUser method")
        const firestore= firebase.firestore();
        firestore.settings({timestampsInSnapshots:true});
        const userOrCompany=this.state.userOrCompany;
        const usersRef=firestore.collection(userOrCompany)
        return usersRef.add({
            name: this.state.username,
            email: this.state.email,
            avatar: gravatar.url(this.state.email),
            userOrCompany: this.state.userOrCompany
        });
    }

    handleInputError = (errors,inputName) => {
       return errors.some(error=>error.message.toLowerCase().includes(inputName))? 'error' : ''
    }

    render () {
        const {userOrCompany,username, email, password, passwordConfirmation, errors, loading} = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h2" icon color="blue" textAlign="center">
                        <Icon name="suitcase" color="blue" />
                        Register for Stride
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <p>User or Company (Please choose one)!</p>
                            <Grid columns={2}><Grid.Row>
                            <GridColumn>
                                User
                            <Form.Input fluid name='userOrCompany' 
                            onChange={this.handleChange} value="User" type="radio"/>
                            </GridColumn>
                            <GridColumn>
                                Company
                            <Form.Input fluid name='userOrCompany'
                            onChange={this.handleChange} value="Company" type="radio"/>
                            </GridColumn>
                            </Grid.Row></Grid>
                            <Form.Input fluid name="username" icon="user" iconPosition="left" placeholder="Username" onChange={this.handleChange} value={username} type="text" />
                            <Form.Input fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" onChange={this.handleChange} value={email} className={this.handleInputError(errors,'email')} type="email" />
                            <Form.Input fluid name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} value={password} className={this.handleInputError(errors,'password')} type="password" />
                            <Form.Input fluid name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" onChange={this.handleChange} value={passwordConfirmation} className={this.handleInputError(errors,'password')} type="password" />

                            <Button disabled={loading} className={loading ? 'loading' : ''} color="blue" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Already a user?<Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;