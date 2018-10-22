import React, { Component } from 'react';
import { PanelGroup, Panel, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import './Users.css';


class Users extends Component {
    render() {
        return (
            <PanelGroup accordion id="accordion-example">
            <Panel eventKey="1">
                <Panel.Heading>
                    <Panel.Title toggle>Changed User #1</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <ListGroup className="show-all-songs">
                        <ListGroupItem><Button >Song 1</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 2</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 3</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 4</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 5</Button></ListGroupItem>
                    </ListGroup>
                </Panel.Body>
            </Panel>
            <Panel eventKey="2">
                <Panel.Heading>
                    <Panel.Title toggle>Changed User #2</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <ListGroup className="show-all-songs">
                        <ListGroupItem><Button >Song 1</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 2</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 3</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 4</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 5</Button></ListGroupItem>
                    </ListGroup>
                </Panel.Body>
            </Panel> 
             <Panel eventKey="3">
                <Panel.Heading>
                    <Panel.Title toggle>Changed User #3</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <ListGroup className="show-all-songs">
                        <ListGroupItem><Button >Song 1</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 2</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 3</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 4</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 5</Button></ListGroupItem>
                    </ListGroup>
                </Panel.Body>
            </Panel>
             <Panel eventKey="4">
                <Panel.Heading>
                    <Panel.Title toggle>Changed User #4</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <ListGroup className="show-all-songs">
                        <ListGroupItem><Button >Song 1</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 2</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 3</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 4</Button></ListGroupItem>
                        <ListGroupItem><Button >Song 5</Button></ListGroupItem>
                    </ListGroup>
                </Panel.Body>
            </Panel>        
        </PanelGroup>


        );
    }
}
export default Users