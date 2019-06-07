import {Button, Container,Form,Checkbox,TextArea,Select, Confirm } from 'semantic-ui-react';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux' 
import React from 'react';
import {connect} from 'react-redux';
import {createProject} from '../../../store/actions/projectAction'
import Spinner from '../../../Spinner'
import {updateProject,disableProject} from '../../../store/actions/projectAction'

const projectTechnologyOptions = [
    {text:'.NET',value:'.NET'},
    {text:'ASP.NET',value:'ASP.NET'},
    {text:'Angular',value:'Angular'},
    {text:'Bach/Shell',value:'Bash/Shell'},
    {text:'C',value:'C'},
    {text:'C#',value:'C#'},
    {text:'C++',value:'C++'},
    {text:'Django',value:'Django'},
    {text:'Elixir',value:'Elixir'},
    {text:'Express',value:'Express'},
    {text:'Flash',value:'Flash'},
    {text:'Go',value:'Go'},
    {text:'HTML/CSS',value:'HTML/CSS'},
    {text:'Java',value:'Java'},
    {text:'JavaScript',value:'JavaScript'},
    {text:'Kotlin',value:'Kotlin'},
    {text:'Laravel',value:'Laravel'},
    {text:'Node.js',value:'Node.js'},
    {text:'Objective-C',value:'Objective-C'},
    {text:'PHP',value:'PHP'},
    {text:'Python',value:'Python'},
    {text:'React',value:'React'},
    {text:'React Native',value:'React Native'},
    {text:'Ruby',value:'Ruby'},
    {text:'Spring',value:'Spring'},
    {text:'Swift',value:'Swift'},
    {text:'TypeScript',value:'TypeScript'},
    {text:'Vue',value:'Vue'},
    {text:'jQuery',value:'jQuery'}
  ]

  const projectDurationOptions = [
    {text:'2 weeks',value:'2 weeks'},
    {text:'3 weeks',value:'3 weeks'},
    {text:'month',value:'month'},
    {text:'2 months',value:'2 months'},
    {text:'3 months',value:'3 months'},
    {text:'6 months',value:'6 months'},
  ]

class UpdateProject extends React.Component{
    
    state = {
        title: '',
        description: '',
        technology:'',
        duration: '',
        errors: [],
        loading: false,
        isDisabled:true,
        conformationIsOpen:false
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    handleSelectChange=(event,data)=>{
        this.setState({[data.name]:data.value})
    }

    handleUpdate=()=>{
        console.log(this.state);
        const { projectId } =this.props;
        this.props.updateProject(this.state, projectId);
        this.props.history.push('/user-projects');
    }

    setInitialState=()=>{
        const {project}=this.props;
        this.setState({
            title:project.title,
            description:project.description,
            technology:project.technology,
            duration: project.duration,
            isDisabled:!this.state.isDisabled
        })
    }

    handleOpenConformation=()=>{
        this.setState({conformationIsOpen:true})
    }

    handleCloseConformation=()=>{
        this.setState({conformationIsOpen:false})
    }

    handleDisable=()=>{
        const {projectId}=this.props;
        console.log("Disable");
        
        this.props.disableProject(projectId);
        this.props.history.push('/user-projects');
    }

    handleChangeRemote=(event,data)=>{
        this.setState({remote:data.checked})
    }


    render(){
        const {project /*,userApplications*/} = this.props;
        const {title, description, duration, tehnology, isDisabled, conformationIsOpen} = this.state;
        
        if(project!==null) {
            return(
                <Container style={{width:"100%",height:"100%"}}>
                    <h1 style={{textAlign:"center",marginRight:"250px"}}> Project </h1>
                    <Container style={{textAlign:"center"}}>
                    <p style={{marginRight:"250px"}}>
                        If you want to update Project, please set initial state first!
                    </p>
                    <Checkbox label="Set Initial State" onClick={this.setInitialState} style={{marginRight:"250px"}}/>
                </Container>
                    <Container style={{textAlign:"center",marginTop:"50px"}}> 
                        <Form onSubmit={this.handleUpdate} style={{marginRight:"250px"}}>
                            <Form.Field >
                                <label>Title</label>
                                <input name="title" value={title} onChange={this.handleChange} placeholder={project.title} 
                                        style={{width:"75%"}}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Project Description</label>
                                <TextArea name="description" value={description} onChange={this.handleChange} 
                                placeholder={project.description} style={{width:"75%"}}/>
                            </Form.Field>
                            <Form.Field >
                                <label>Project duration</label>
                                <Form.Select  onChange={this.handleSelectChange} options={projectDurationOptions} placeholder={project.duration} name="duration" style={{width:"75%"}}>
                                </Form.Select>
                            </Form.Field>
                            <Form.Field >
                                <label>Technology</label>
                                <Form.Select  onChange={this.handleSelectChange} options={projectTechnologyOptions} placeholder="Technology" name="technology" style={{width:"75%"}}>
                                </Form.Select>
                            </Form.Field>
                            <Button disabled={isDisabled} style={{marginTop:"50px",marginBottom:"50px"}} type='submit'>
                                Update Changes
                            </Button>
                        </Form>
                        <Container style={{textAlign:"center"}}>
                            <p style={{marginRight:"250px"}}>
                                Disable option:
                            </p>

                            <Button onClick={this.handleOpenConformation} style={{marginRight:"250px"}} >
                                Disable Project
                            </Button>
                            <Confirm open={conformationIsOpen} onCancel={this.handleCloseConformation} onConfirm={this.handleDisable}  content='Are you sure that you want to disable this job?' confirmButton="Disable"/>
                        </Container>    
                        {/*<Container>
                            {
                                userApplications===undefined?
                                <Spinner/>
                                :
                                userApplications.length===0?
                                <h3>0 prijavljenih</h3>
                                :
                                userApplications.map((userProfile)=>{
                                return(
                                    <div key={userProfile.userId} style={{textAlign:"center",marginRight:"250px",height:"150px",     marginTop:"5px",borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                                        <h3>{userProfile.userName}</h3>
                                        <h3>{userProfile.userEmail}</h3>
                                    </div>
                                    )
                                })
                            } 
                        </Container>
                    */}
                    </Container>
                </Container>
            )
        }
        else {
            return <Spinner />;
        }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        updateProject:(updatedProject,updatedProjectId)=>dispatch(updateProject(updatedProject,updatedProjectId)),
        disableProject:(thisProjectId)=>dispatch(disableProject(thisProjectId))
    }
}

const mapStateToProps = (state, ownProps) => {

    const thisProjectId = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[thisProjectId] : null
    return {
        project: project,
        projectId:thisProjectId,
        userApplications:state.firestore.ordered.userApplications
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props)=>[
        { 
            collection: 'projects' 
        }//,
       // {
        //    collection:'projects',
        //    doc:props.projectId,
        //    subcollections:[{collection:'userApplications'}],
        //    storeAs: 'userApplications'
       // }
    ])
)(UpdateProject)
