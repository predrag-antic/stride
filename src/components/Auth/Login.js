import { Grid, Form, Segment, Button, Header, Message, Icon, Image } from 'semantic-ui-react';

import React from 'react';
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';
import { Redirect,NavLink } from 'react-router-dom';

import { signIn } from '../../store/actions/authActions'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errors: [],
        loading: false
    }
    
    displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>);

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.isFormValid(this.state)) {
            this.setState({errors: [], loading: true});
            this.props.signIn(this.state);
        }

        setTimeout(()=>{  //ceka se da firebase zavrsi posao zato 1 sekunda
            if(this.props.error!==null){
            this.setState({
                errors:this.state.errors.concat(this.props.error),
                loading: false
            });
            }
            },1000);
        
    };

    isFormValid = ({email,password}) => email && password;


    handleInputError = (errors,inputName) => {
       return errors.some(error=>error.message.toLowerCase().includes(inputName))? 'error' : ''
    }

    render () {
        const {email, password, errors, loading } = this.state;

        if(this.props.auth.uid) return <Redirect to="/home" />

        return (
            <Grid textAlign="center" verticalAlign="middle" className="welcome" style={{marginLeft:'0rem',marginTop:'0rem'}}>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h1" textAlign="center" style={{color:"white",fontSize:"px",fontFamily:"Nexa",fontWeight:"600"}}>
                        <Image src={require('../../logo.png')} to='/appWelcome' as={NavLink}/><br></br>
                        Login to Stride
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" onChange={this.handleChange} value={email} className={this.handleInputError(errors,'email')} type="email" />
                            <Form.Input fluid name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} value={password} className={this.handleInputError(errors,'password')} type="password" />

                            <Button disabled={loading} className={loading ? 'loading' : ''} color="blue" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Don't have an account? <Link to="/register">Register</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}


const mapDispatchToProps=dispatch=>{
    return{
        signIn:(credential)=>dispatch(signIn(credential))
    }
}

const mapStateToProps=state=>{
    return{
        auth: state.firebase.auth,
        error: state.auth.authError
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);

