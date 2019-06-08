import { Button, Container,Form } from 'semantic-ui-react';

 import ProjectList from './ProjectList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {setProjectFilter} from '../../../store/actions/projectFilterAction'

 import React from 'react';

 const projectTechnologyOptions = [
    {text:'All',value:'All'},
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

 class ProjectPage extends React.Component{

    state={
        projectTechnology:"All"
    }

    handleSelect=(event,data)=>{
        this.setState({[data.name]:data.value})
    }

    handleSetFilter=()=>{
        this.props.setProjectFilter(this.state.projectTechnology)
    }

     render(){
        const {projects}=this.props;
        return(
            <Container style={{marginTop:"7em"}}>
                 <h1 style={{textAlign:"center", fontFamily:"Nexa Regular", fonSize:"30px"}}>Projects</h1>
                <Container style={{textAlign:"center",marginTop:"30px"}}>
                    <Container  style={{marginBottom:"30px"}}>
                        <Form onSubmit={this.handleSetFilter} >
                            <Form.Group>
                                <Form.Select  onChange={this.handleSelect} options={projectTechnologyOptions} label="Technology:"  placeholder="All" name="projectTechnology" >
                                </Form.Select>
                                <Button style={{width:"190px", background:"#d0efff", marginTop:"24px",marginLeft:"10px"}} type='submit'>
                                    Search
                                </Button >
                            </Form.Group>
                        </Form>
                    </Container>
                    <Container >
                        {
                            projects!==undefined?
                            projects.length===0?
                            <h3 style={{marginTop:"60px"}}>No projects for this filter</h3> //ovde nesto drugo da ide ne h3
                            :
                            <ProjectList listOfProjects={projects}/>
                            :
                            <ProjectList listOfProjects={projects}/>
                        }
                    </Container>
                </Container>
            </Container>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        setProjectFilter:(technology)=>dispatch(setProjectFilter(technology))
    }
}

 const mapStateToProps=(state)=>{
    console.log(state);
    return{
        projects:state.firestore.ordered.projects,
        technology:state.projectfilters.technology
    }
}

 export default compose(connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props)=>{
        if(props.technology!=="All"){
            return [{
                collection:'projects',
                where:[
                    ["technology","==",props.technology]
                ],
                orderBy:['createdAt','desc']
            }]
        }else{
            return [{
                collection:'projects',
                orderBy:['createdAt','desc']
            }]
        }
    }
    ))
    (ProjectPage);