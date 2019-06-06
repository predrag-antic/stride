import { Button, Container,Form } from 'semantic-ui-react';

import InternshipList from './InternshipList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import React from 'react';
import {setInternshipFilter} from '../../../store/actions/internshipFilterAction'

const internshipTechnologyOptions = [
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

  const internshipDurationOptions = [
    {text:'All',value:'All'},
    {text:'2 weeks',value:'2 weeks'},
    {text:'3 weeks',value:'3 weeks'},
    {text:'month',value:'month'},
    {text:'2 months',value:'2 months'},
    {text:'3 months',value:'3 months'},
    {text:'6 months',value:'6 months'},
  ]

  const internshipPaidOptions= [
    {text:'All',value:'All'},
    {text:'Paid',value:'Paid'},
    {text:'Unpaid',value:'Unpaid'}
  ]

class InternshipPage extends React.Component{
    
    state={
        internshipTechnology:"All",
        internshipDuration:"All",
        internshipPaid:"All"
    }

    handleSelect=(event,data)=>{
        this.setState({[data.name]:data.value})
    }

    handleSetFilter=()=>{
        console.log("Set Filter Handle");
        this.props.setInternshipFilter(this.state);
    }

    render(){
        const {internships}=this.props;
        return(
            <Container style={{width:"100%",height:"100%",marginTop:"7em"}}>
                <h1 style={{textAlign:"center", fontFamily:"Nexa", fonSize:"30px"}}>Internships</h1>
                <Container style={{textAlign:"center", marginTop:"30px"}}>
                <Container  style={{marginBottom:"10px"}}>
                        <Form onSubmit={this.handleSetFilter} style={{marginRight:"250px"}}>
                            <Form.Group>
                                <Form.Select  onChange={this.handleSelect} options={internshipTechnologyOptions}    label="Technology"  placeholder="All" name="internshipTechnology" style={{width:"20px"}}>
                                </Form.Select>
                                <Form.Select  onChange={this.handleSelect} options={internshipDurationOptions}           label="Duration" placeholder="All" name="internshipDuration" style={{width:"20px"}}>
                                </Form.Select>
                                <Form.Select  onChange={this.handleSelect} options={internshipPaidOptions}           label="Paid/Unpaid" placeholder="All" name="internshipPaid" style={{width:"20px"}}>
                                </Form.Select>
                                <Button  type='submit'>
                                    Search
                                </Button >
                            </Form.Group>
                        </Form>
                    </Container>
                    <Container >
                    {
                            internships!==undefined?
                            internships.length===0?
                            <h3>No internships for this filter</h3> //ovde nesto drugo da ide ne h3
                            :
                            <InternshipList listOfInternships={internships}/>
                            :
                            <InternshipList listOfInternships={internships}/>
                        }
                    </Container>
                </Container>
            </Container>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        setInternshipFilter:(filter)=>dispatch(setInternshipFilter(filter))
    }
}

const mapStateToProps=(state)=>{
    console.log(state);
    return{
        internships:state.firestore.ordered.internships,
        technology:state.internshipfilters.technology,
        duration:state.internshipfilters.duration,
        paid:state.internshipfilters.paid
    }
}

export default compose(connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props)=>{
        if(props.technology!=="All" && props.duration!=="All" && props.paid!=="All"){
            return [{
                collection:'internships',
                where:[
                    ["technology","==",props.technology],
                    ["duration","==",props.duration],
                    ["paid","==",props.paid]
                ],
                orderBy:['createdAt']
            }]
        }else if(props.technology!=="All" && props.duration==="All" && props.paid==="All"){
            return [{
                collection:'internships',
                where:[
                    ["technology","==",props.technology]
                ],
                orderBy:['createdAt']
            }]
        }else if(props.technology==="All" && props.duration!=="All" && props.paid==="All"){
            return [{
                collection:'internships',
                where:[
                    ["duration","==",props.duration]
                ],
                orderBy:['createdAt']
            }]
        }else if(props.technology==="All" && props.duration==="All" && props.paid!=="All"){
            return [{
                collection:'internships',
                where:[
                    ["paid","==",props.paid]
                ],
                orderBy:['createdAt']
            }]
        }else if(props.technology!=="All" && props.duration!=="All" && props.paid==="All"){
            return [{
                collection:'internships',
                where:[
                    ["technology","==",props.technology],
                    ["duration","==",props.duration]
                ],
                orderBy:['createdAt']
            }]
        }else if(props.technology!=="All" && props.duration==="All" && props.paid!=="All"){
            return [{
                collection:'internships',
                where:[
                    ["technology","==",props.technology],
                    ["paid","==",props.paid]
                ],
                orderBy:['createdAt']
            }]
        }else if(props.technology==="All" && props.duration!=="All" && props.paid!=="All"){
            return [{
                collection:'internships',
                where:[
                    ["duration","==",props.duration],
                    ["paid","==",props.paid]
                ],
                orderBy:['createdAt']
            }]
        }else{
            return [{
                collection:'internships',
                orderBy:['createdAt']
            }]
        }
    }
    ))
    (InternshipPage);