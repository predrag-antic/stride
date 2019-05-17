import React from 'react';
import ReactDOM from 'react-dom';
import firebase from '../../firebase'; //this firebase interact with signOut->dropdown span(handleSignout)
import { Grid, Header,Icon, Dropdown,Button } from 'semantic-ui-react';



class UserPanel extends React.Component{
    
    handleSignout=()=>{
        firebase
        .auth()
        .signOut()
        .then(()=>console.log("signed out!"));
    };

    render(){
        return(
            <Grid style={{background:'#4c3c4c'}}>
                <Grid.Column>
                    <Grid.Row style={{padding: '1.2em',margin:0}}>
                        {/*header*/}
                        <Header inverted floated="left" as="h1">
                            <Icon name="briefcase"></Icon>
                            <Header.Content>Stride</Header.Content>
                        </Header>
                    </Grid.Row>  
                    <Header textAlign="center" as="h3" inverted style={{marginTop:50}}> 
                        <Button basic style={{background:'#4c3c4c'}} inverted 
                                 onClick={this.handleSignout}>
                        Logout
                        </Button>
                    </Header>
                    <Header textAlign="center" as="h3" inverted>
                        <Button basic style={{background:'#4c3c4c'}} inverted>
                        Info
                        </Button>
                    </Header>
                </Grid.Column>

            </Grid>

            
        )
    }

}

export default UserPanel;