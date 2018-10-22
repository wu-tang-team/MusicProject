import React, { Component } from 'react';
import {Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CustomNavbar.css';

class CustomNavbar extends Component {
    render() {
        return (
            <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
           
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
          
            <NavItem eventKey={4} componentClass={Link} href="/SignUp2" to="/SignUp2">
           
            </NavItem>

        
            <NavItem eventKey={5} componentClass={Link} href="/Login2" to="/Login2">
            
            </NavItem>
           
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        );
    }
}

export default CustomNavbar