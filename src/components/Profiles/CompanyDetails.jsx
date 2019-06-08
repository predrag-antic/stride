
import React from 'react'
import { Container, Form, Card,Image, Grid, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Spinner from '../../Spinner'
 
const CompanyDetails = (props) => {
    const { profile } = props; 
    if (profile) {
        return (
            <Container style={{marginTop:"7em"}}>
                {/* <h1 style={{textAlign:"center", fontSize:"30px", fontFamily:"Nexa Bold"}}>Company info</h1> */}
                
                <Container style={{textAlign: 'center', marginTop: '30px'}}>
                    <Form>
                        <Card fluid style={{padding:"40px", marginBottom:"50px"}}>
                        <Grid stackable columns="equal">
                            <Grid.Column textAlign={"right"}>
                            {profile.avatarUrl===undefined?
                                <div/>:profile.avatarUrl===""?
                                <Image avatar src={profile.avatar} style={{height:"150px",width:"150px",background:"#d0efff", border:'2px solid #eee'}} />
                                :
                                <Image avatar src={profile.avatarUrl} style={{height:"150px",width:"150px",background:"#d0efff", border:'2px solid #eee'}} />
                            }
                            </Grid.Column>
                            <Grid.Column verticalAlign={"middle"} width={10} textAlign={"center"}>
                                <Form.Field style={{fontSize:"40px", marginTop:"20px" , fontFamily:"Nexa Bold", verticalAlign:"middle"}}>
                                    {profile.companyName}
                                </Form.Field>
                                    <label style={{display:'block',marginBottom:"10px"}}>Website:</label>
                                    <Form.Field style={{decoration:"none", fontSize:"18px", color:"black",fontWeight:"bold"}} href={profile.website} target="_blank">
                                        {profile.website}
                                    </Form.Field>
                            </Grid.Column>
                        </Grid>
                        <Divider style={{margin:"40px"}}></Divider>
                        <Grid stackable >
                           <Grid.Row columns={2} style={{margin:"0px 50px"}}>
                               <Grid.Column>
                                    <label >Email:</label>
                                    <Form.Field style={{ fontSize:"22px",fontWeight:"bold", marginTop:"10px"}} >
                                        {profile.eMail}
                                    </Form.Field>
                               </Grid.Column>
                               <Grid.Column stretched>
                                    <label >Phone:</label>
                                    <Form.Field style={{ fontSize:"22px",fontWeight:"bold", marginTop:"10px"}} >
                                        {profile.phoneNumber}
                                    </Form.Field>
                               </Grid.Column>
                           </Grid.Row>
                           <Grid.Row columns={3} style={{marginTop:"10px"}}>
                                <Grid.Column stretched>
                                    <label >Founded:</label>
                                    <Form.Field style={{fontWeight:"bold", marginTop:"10px", fontSize:"22px", color:"black"}}>
                                        {profile.founded}
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column stretched>
                                    <label>Headquarters:</label>
                                    <Form.Field style={{fontWeight:"bold", marginTop:"10px",fontSize:"22px", color:"black"}}>
                                        {profile.headquarters}
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column stretched>
                                    <label>Number of employees:</label>
                                    <Form.Field style={{fontWeight:"bold", marginTop:"10px", fontSize:"22px", color:"black"}}>
                                        {profile.numOfEmployees}
                                    </Form.Field>
                                </Grid.Column> 
                            </Grid.Row>
                        </Grid>
                        <Divider style={{margin:"40px"}}></Divider>                              
                        <Form.Field>
                            <h2>About {profile.companyName}</h2>
                            <p style={{padding:"20px 40px"}}>{profile.aboutUs}</p>
                        </Form.Field>
                       </Card> 
                    </Form>
                </Container>
            </Container> 
        )
    }
    else {
        return (
            <Spinner/>
            )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const profiles = state.firestore.data.profiles;
    const profile = profiles ? profiles[id] : null
    return {
         profile: profile,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'profiles' }
    ])
)(CompanyDetails)