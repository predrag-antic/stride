import {Button, Form, Container, Card, Grid, Message, Divider,Image} from 'semantic-ui-react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

import React from 'react';
import {connect} from 'react-redux';
import { updateProfile } from '../../store/actions/updateProfile'

class Company extends React.Component{
    state={
        avatar: '',
        avatarUrl: '',
        userName: '',
        companyName: '',
        founded: '',
        headquarters: '',
        website: '',
        eMail: '',
        phoneNumber: '',
        aboutUs: '',
        numOfEmployees: '',
        errors: [],
        loading: false
    }

    isFormValid = () => {
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)) {
            error = { message: 'Fill all fields with *'};
            this.setState({errors: errors.concat(error)});
            return false;
        }
        else {
            return true;
        }
    }

    isFormEmpty = ({ companyName ,eMail,founded,headquarters,website,aboutUs}) => {
        return !companyName.length || !eMail.length || 
        !founded.length || !headquarters.length || !website.length || !aboutUs.length;
    }

    updateProfile=()=>{
        this.props.updateProfile(this.state);
    }

    displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>);


    handleSubmit =(e) => {
        e.preventDefault();
        if(this.isFormValid()) {
            this.setState({errors: [], loading: true});
            this.updateProfile();
            this.props.history.push('/home');

            setTimeout(()=>{ 
                if(this.props.error!==null){
                    this.setState({
                        errors:this.state.errors.concat(this.props.error),
                        loading: false                
                    });
            }},1000);
        }
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        })
    }

    handleUploadSucces = filename => {
        this.setState({
            avatar: filename
        })
        firebase.storage().ref('avatars').child(filename).getDownloadURL()
        .then(url => this.setState({
            avatarUrl: url
        }))
    }
    
    render(){
        const {userName, companyName, founded, headquarters, website, phoneNumber, eMail, aboutUs, numOfEmployees, errors, loading} = this.state;
        const {avatarUrl,avatar,firstAccess}= this.props;

        return (
            <Container >
                <h1 style={{textAlign:"center", fontSize:"30px", fontFamily:"Nexa Bold"}}>Company information</h1>

                <Container style={{textAlign:"left", marginTop:"30px"}}>
                {errors.length > 0 && (
                    <Message error>
                        <h3>Error</h3>
                        {this.displayErrors(errors)}
                    </Message>
                )}
                <Form onSubmit={this.handleSubmit}>
                <Card fluid style={{padding:"40px", marginBottom:"50px"}}>
                    <Form.Field style={{textAlign:"center"}}>
                    {
                    firstAccess===true?<Image avatar src={avatar} style={{height:"20vw",objectFit:"cover",width:"20vw",overflow:'hidden',position:'relative',background:"#d0efff", border:'2px solid #eee'}} />:
                    avatarUrl===undefined?
                        <div/>:avatarUrl===""?
                        <Image avatar src={avatar} style={{height:"20vw",objectFit:"cover",width:"20vw",overflow:'hidden',position:'relative',background:"#d0efff", border:'2px solid #eee'}} />
                        :
                        <Image avatar src={avatarUrl} style={{height:"20vw",objectFit:"cover",width:"20vw",overflow:'hidden',position:'relative',background:"#d0efff", border:'2px solid #eee'}} />
                    }
                    </Form.Field>
                    <Form.Field style={{marginTop:"10px"}}>
                        <FileUploader 
                            accept="image/*"
                            name='avatar'
                            randomizeFilename
                            storageRef={firebase.storage().ref('avatars')}
                            onUploadSuccess={this.handleUploadSucces}
                            
                        />
                    </Form.Field>
                    <Grid stackable >
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Form.Field style={{marginTop:"15px"}}>
                                    <Form.Input fluid name="userName" label={"Username:"} type="text" value={userName} placeholder={this.props.CName} onChange={this.handleChange}  style={{marginTop:"5px"}}/>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field style={{marginTop:"15px"}}>
                                    <Form.Input fluid name="companyName" label={"Company name: *"} type="text" value={companyName} placeholder={this.props.CCompanyName} onChange={this.handleChange}  style={{marginTop:"5px"}}/>
                                </Form.Field>
                            </Grid.Column>
                            </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Form.Field style={{marginTop:"15px"}}>
                                    <Form.Input fluid name="website" type="text" label={"Website: *"} value={website} placeholder={this.props.CWebsite} onChange={this.handleChange}  style={{marginTop:"5px"}} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field style={{marginTop:"15px"}}>
                                    <Form.Input fluid name="eMail" type="text" label={"Email: *"} value={eMail} placeholder={this.props.CEmail} onChange={this.handleChange}  style={{marginTop:"5px"}} />
                                </Form.Field>
                            </Grid.Column>
                            </Grid.Row>
                            <Divider style={{marginTop:"30px"}}></Divider>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <Form.Field style={{marginTop:"10px"}}>
                                        <Form.Input fluid name="founded" type="text" label={"Founded: *"} value={founded} placeholder={this.props.CFounded} onChange={this.handleChange} style={{marginTop:"5px"}} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field style={{marginTop:"10px"}}>
                                        <Form.Input fluid name="headquarters" type="text" value={headquarters} label={"Headquarters: *"} placeholder={this.props.CHeadquarters} onChange={this.handleChange}  style={{marginTop:"5px"}} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field style={{marginTop:"10px"}}>
                                        <Form.Input fluid name="numOfEmployees" type="text" value={numOfEmployees} label={"Number of employees:"} placeholder={this.props.CNumOfEmpl} onChange={this.handleChange}  style={{marginTop:"5px"}} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Form.Field style={{marginTop:"30px"}}>
                            <Form.Input fluid name="phoneNumber" value={phoneNumber} type="text" label={"Phone:"} placeholder={this.props.CPhoneNumber} onChange={this.handleChange}  style={{marginTop:"5px"}} />
                        </Form.Field>
                        <Divider style={{marginTop:"30px"}}></Divider>
                        <Form.Field style={{marginTop:"15px"}}>
                            <Form.TextArea rows={3} name="aboutUs" value={aboutUs} type="text" label={"About us: *"} placeholder={this.props.CAboutUs} onChange={this.handleChange}  style={{marginTop:"5px"}} />
                        </Form.Field>

                        <Button style={{marginTop:"30px", background:"#d0efff"}}>Submit</Button>
                    
                    </Card>
                    
                </Form>
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
    return {
        avatar: state.firebase.profile.avatar,
        avatarUrl: state.firebase.profile.avatarUrl,
        CName: state.firebase.profile.name,
        CCompanyName: state.firebase.profile.companyName,
        CFounded: state.firebase.profile.founded,
        CHeadquarters: state.firebase.profile.headquarters,
        CEmail: state.firebase.profile.eMail,
        CPhoneNumber: state.firebase.profile.phoneNumber,
        CWebsite: state.firebase.profile.website,
        CNumOfEmpl: state.firebase.profile.numOfEmployees,
        CAboutUs: state.firebase.profile.aboutUs,
        error: state.auth.authError,
        firstAccess: state.firebase.profile.firstAccess
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Company);