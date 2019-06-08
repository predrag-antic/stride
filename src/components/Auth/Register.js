import gravatar from 'gravatar';
import { Grid, Form, Segment, Button, Header, Message, Icon , GridColumn, Image } from 'semantic-ui-react';

import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Redirect,NavLink} from 'react-router-dom';

import {register} from '../../store/actions/authActions';

class Register extends React.Component {
    state = {
        userOrCompany: '',
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
        return userOrCompany===''?false:true; 
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
            this.props.register(this.state);

            setTimeout(()=>{  //da bi firebase zavrsila posao zato se ceka ovde
                if(this.props.error!==null){
                this.setState({
                    errors:this.state.errors.concat(this.props.error),
                    loading: false
                });
            }},1000);
        }
    };

    handleInputError = (errors,inputName) => {
       return errors.some(error=>error.message.toLowerCase().includes(inputName))? 'error' : ''
    }

    render () {
        const { username, email, password, passwordConfirmation, errors, loading } = this.state;

        if(this.props.auth.uid) return <Redirect to="/home" />

        return (
            <Grid textAlign="center" verticalAlign="middle" className="welcome" style={{marginLeft:'0rem',marginTop:'0rem'}}>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h1" textAlign="center" style={{color:"white",fontSize:"px",fontFamily:"Nexa Bold",fontWeight:"600"}} >
                        <Image src={require('../../assets/logo.png')} to='/appWelcome' as={NavLink}/><br></br>
                        Register for Stride
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input fluid name="username" icon="user" iconPosition="left" placeholder="Username" onChange={this.handleChange} value={username} type="text" />
                            <Form.Input fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" onChange={this.handleChange} value={email} className={this.handleInputError(errors,'email')} type="email" />
                            <Form.Input fluid name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} value={password} className={this.handleInputError(errors,'password')} type="password" />
                            <Form.Input fluid name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" onChange={this.handleChange} value={passwordConfirmation} className={this.handleInputError(errors,'password')} type="password" />
                            
                            <Grid columns={2} style={{marginBottom:'10px'}}>
                                <Grid.Row>
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
                                </Grid.Row>
                            </Grid>

                            <Button disabled={loading} className={loading ? 'loading' : ''} color="blue" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Already a user? <Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        register:(newUser)=>dispatch(register(newUser))
    }
}

const mapStateToProps=state=>{
    console.log(state);
    return{
        auth: state.firebase.auth,
        error: state.auth.authError
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);