import {Button, Icon } from 'semantic-ui-react';
import React from 'react';

import { NavLink } from 'react-router-dom'

class NavbarCompanyLinks extends React.Component{
    
    render(){
        return(
            <div>
                <Button animated size="mini" inverted as={NavLink} to="/post-Internship" >
                    <Button.Content visible>
                        Post Internship
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon name='student'/>
                    </Button.Content>
                </Button> 
                <Button animated size="mini" inverted as={NavLink} to="/post-job" >
                    <Button.Content visible>
                        Post Job
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon name='briefcase'/>
                    </Button.Content>
                </Button>
            </div>
        )
    }
}

export default NavbarCompanyLinks;