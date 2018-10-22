import React, { Component } from 'react';
import {Grid, Row, Col, Image, Tab, Tabs} from 'react-bootstrap';
import Navbar from '../components/LoginNavbar';
import LoginTab from '../components/Login';
import SignupTab from '../components/Signup';

import './styles.css';

const bgColor = {
    background: '#1c0e3e'
  };
  const bgColorWhite = {
    background: '#fff'
  };

  const padd = {
    padding:'60px 0'
  };

class Login extends Component {
    render() {
        return (
            <div>
            <Navbar />,
           
       <div className="login-container">
            <Grid fluid>
             <Row className="show-grid " style={bgColor}>
              <Col xs={12} sm={6} md={6}  style={bgColorWhite}>

                <div className="login-form">
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Login">
                    <LoginTab />
                    </Tab>
                    <Tab eventKey={2} title="Sign Up">
                    <SignupTab />
                    </Tab>
                </Tabs>
                </div>
               

                </Col>
                <Col xs={12} sm={6} md={6}>
                <div className="centerImage">
                <div   style={padd}>
                <Image src="/images/wutang.png" rounded className="centerImage"/>
                <Image src="/images/team.png" rounded className="centerImage" />
                </div>
                <hr/>
                <Image src="/images/logo.png" rounded className="centerImage"  style={padd}/>
                </div>
                </Col>
            </Row>
            </Grid>
        </div> 
        </div>
                            
            );
        }
    }

export default Login;