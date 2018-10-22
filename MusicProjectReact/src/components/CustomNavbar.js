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
            <NavItem eventKey={1} componentClass={Link} href="/profile" to="/profile">
              Home
            </NavItem>
            <NavItem eventKey={4} componentClass={Link} href="/update" to="/update">
            Update Songs
            </NavItem>
            <NavItem eventKey={5} componentClass={Link} href="/" to="/">
            Log Out
            </NavItem>
           
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        );
    }
}

export default CustomNavbar