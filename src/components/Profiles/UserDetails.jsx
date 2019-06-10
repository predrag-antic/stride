
import React from 'react'
import { Container, Form, Card, Grid, Image, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Spinner from '../../Spinner'

 
const UserDetails = (props) => {
    const { profile } = props; 
    if (profile) {
        return (
            <Container style={{marginTop:"7em"}}>
                {/* <h1 style={{ color: '#187bcd', fontWeight: 'bold', fontSize: 50, textAlign:'center', marginRight: 250}}>User info</h1> */}
                
                <Container style={{textAlign: 'center', marginTop: '30px'}}>
                    <Form>
                    <Card fluid style={{padding:"40px", marginBottom:"50px"}}>
                    <Grid stackable columns="equal">
                            <Grid.Column textAlign={"center"}>
                            {profile.avatarUrl===undefined?
                                <div/>:profile.avatarUrl===""?
                                <Image avatar src={profile.avatar} style={{height:"15vw",objectFit:"cover",width:"15vw",overflow:'hidden',position:'relative',background:"#d0efff", border:'2px solid #eee'}} />
                                :
                                <Image avatar src={profile.avatarUrl} style={{height:"15vw",objectFit:"cover",width:"15vw",overflow:'hidden',position:'relative',background:"#d0efff", border:'2px solid #eee'}} />
                            }
                            </Grid.Column>
                            <Grid.Column verticalAlign={"middle"} width={10} textAlign={"center"}>
                                <Form.Field style={{fontSize:"40px", marginTop:"20px" , fontFamily:"Nexa Bold", verticalAlign:"middle",  lineHeight: 1}}>
                                    {profile.fullname}
                                </Form.Field>
                                    <label style={{display:'block',marginBottom:"10px"}}>Email:</label>
                                    <Form.Field style={{decoration:"none", fontSize:"18px", color:"black",fontWeight:"bold"}} >
                                        {profile.email}
                                    </Form.Field>
                            </Grid.Column>
                        </Grid>
                        <Divider style={{margin:"40px"}}></Divider>
                        <Grid stackable >
                           <Grid.Row columns={3} style={{margin:"0px 50px"}}>
                               <Grid.Column>
                                    <label >City:</label>
                                    <Form.Field style={{ fontSize:"22px",fontWeight:"bold", marginTop:"10px"}} >
                                        {profile.city}
                                    </Form.Field>
                               </Grid.Column>
                               <Grid.Column stretched>
                                    <label >Country:</label>
                                    <Form.Field style={{ fontSize:"22px",fontWeight:"bold", marginTop:"10px"}} >
                                        {profile.country}
                                    </Form.Field>
                               </Grid.Column>
                               <Grid.Column>
                                   <label>Postcode:</label>
                            <Form.Field style={{fontWeight:"bold", marginTop:"10px", fontSize:"22px", color:"black"}}>
                                {profile.postcode}
                            </Form.Field>
                               </Grid.Column>
                           </Grid.Row>
                           </Grid>
                           <Divider style={{margin:"40px"}}></Divider>                              
                            <Form.Field>
                            <h2>About {profile.fullname}</h2>
                            <p style={{padding:"20px 40px"}}>{profile.informations}</p>
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
)(UserDetails)