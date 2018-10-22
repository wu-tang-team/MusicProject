import React, { Component } from 'react';
import {Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import './styles.css';

class Invite extends Component {
    render() {
        return (

            <div>
            <Form inline> 
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Name</ControlLabel>{' '}
                    <FormControl type="text" placeholder="Jane Doe" />
                </FormGroup>{' '}
                <FormGroup controlId="formInlineEmail">
                    <ControlLabel>Email</ControlLabel>{' '}
                    <FormControl type="email" placeholder="jane.doe@example.com" />
                </FormGroup>{' '}
            <Button type="submit">Send invitation</Button>
            </Form>;
            </div>
            
        );
    }
}
export default Invite;