import React from 'react';
import { Loader, Dimmer, Container } from 'semantic-ui-react';

const Spinner = () => (
    <Dimmer active >
        <Loader size="huge" content={"Loading..."} />
    </Dimmer>
)

export default Spinner;