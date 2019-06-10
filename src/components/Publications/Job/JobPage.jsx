import { Button, Container,Form } from 'semantic-ui-react';

import JobList from './JobList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

import React from 'react';
import {setJobFilter} from '../../../store/actions/jobFilterAction'

const jobPositionsOptions = [
    {text:'All',value:'All'},
    {text:'Junior',value:'Junior'},
    {text:'Middle',value:'Middle'},
    {text:'Senior',value:'Senior'},
    {text:'Other',value:'Other'}
  ]

const jobTechnologyOptions = [
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


class JobPage extends React.Component{

    state={
        jobPosition:'All',
        jobTechnology:"All"
    }

    handleSelectJobPosition=(event,data)=>{
        this.setState({[data.name]:data.value})
    }

    handleSelectJobTechnology=(event,data)=>{
        this.setState({[data.name]:data.value})
    }

    handleSetFilter=()=>{
        const {jobPosition,jobTechnology}=this.state;
        this.props.setJobFilter(jobPosition,jobTechnology);
    }
    render(){
        const {jobs}=this.props;
        return(
            <Container >
                <h1 style={{textAlign:"center", fontFamily:"Nexa Regular", fonSize:"30px"}}>Jobs</h1>
                <Container style={{textAlign:"center",marginTop:"30px"}}>
                    <Container style={{marginBottom:"30px"}}> 
                        <Form onSubmit={this.handleSetFilter}>
                            <Form.Group>
                                <Form.Select  onChange={this.handleSelectJobPosition} options={jobPositionsOptions} label="Position:"  placeholder="All" name="jobPosition" >
                                </Form.Select>
                                <Form.Select  onChange={this.handleSelectJobTechnology} options={jobTechnologyOptions}  label="Technology:" placeholder="All" name="jobTechnology" >
                                </Form.Select>
                                <Button style={{width:"190px", background:"#d0efff", marginTop:"24px",marginLeft:"10px"}} type='submit'>
                                    Search
                                </Button >
                            </Form.Group>
                        </Form>
                    </Container>
                    <Container >
                        {
                            jobs!==undefined?
                            jobs.length===0?
                            <h3 style={{marginTop:"60px"}}>No jobs for this filter</h3> //ovde nesto drugo da ide ne h3
                            :
                            <JobList listOfJobs={jobs}/>
                            :
                            <JobList listOfJobs={jobs}/>
                        }
                    </Container>
                </Container>
            </Container>
        )
    }
}

const mapStateToDispatch=(dispatch)=>{
    return{
        setJobFilter:(position,technology)=>dispatch(setJobFilter(position,technology))
    }
}

const mapStateToProps=(state)=>{
    return{
        jobs:state.firestore.ordered.jobs,
        position:state.jobfilters.position,
        technology:state.jobfilters.technology
    }
}
export default compose(connect(mapStateToProps,mapStateToDispatch),
    firestoreConnect((props)=>{
        if(props.position!=="All" && props.technology!=="All"){
            return [{
                collection:'jobs',
                where:[
                    ["position","==",props.position],
                    ["technology","==",props.technology]
                ],
                orderBy:['createdAt','desc']
            }]
        }else if(props.position!=="All" && props.technology==="All"){
            return [{
                collection:'jobs',
                where:["position","==",props.position],
                orderBy:['createdAt','desc']
            }]
        }else if(props.position==="All" && props.technology!=="All"){
            return [{
                collection:'jobs',
                where:["technology","==",props.technology],
                orderBy:['createdAt','desc']
            }]
        }else{
            return [{
                collection:'jobs',
                orderBy:['createdAt','desc']
            }]
        }
}
    ))
    (JobPage);