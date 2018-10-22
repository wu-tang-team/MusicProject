import React, { Component } from 'react';
import {Grid, Row, Col, Form, FormGroup, FormControl, Tab, Tabs, Image, Button} from 'react-bootstrap';
import Navbar from '../components/LoginNavbar';
import axios from 'axios';
import './Login.css';
import '../pages/styles.css';


const bgColor = {
    background: '#1c0e3e'
  };
  const bgColorWhite = {
    background: '#fff'
  };

  const padd = {
    padding:'60px 0'
  };

class AddSongs extends Component {
        constructor(props) {
        super(props);
        this.state = {
            user : {
                fname: '',
                lname: '',
                uname: '',
                userid: 0,
                email: ''
    
            }
          
        };
      }

    componentDidMount() {
        var fName=localStorage.getItem('firstName');
        var lName=localStorage.getItem('lastName');
        var uName=localStorage.getItem('userName');
        var userId=localStorage.getItem('userId');
        var email=localStorage.getItem('email');
        
        this.setState({
            user : {
                fname: fName,
                lname: lName,
                uname: uName,
                userid: userId,
                email: email

            }
        })
    
    }
    handleSubmit = event => {
        event.preventDefault();
    
        var owner= localStorage.getItem('userId');
        var artist= document.getElementById('artistName').value;
        var song= document.getElementById('songName').value;
        var url= document.getElementById('url').value;
        var postURL= 'http://localhost:3001/users/createsonglist/';
        axios.post(postURL, {
           ArtistName: artist,
           SongName: song,
           URL: url,
           Owner: owner

        })
          .then(res => { 
              console.log(res.data)
              if (res.data.allSongs){
                  alert('You have 5 songs')
                this.props.history.push('/profile')
              } else {
                document.getElementById('artistName').value = '';
                document.getElementById('songName').value = '';
                document.getElementById('url').value = '';
                alert('Song Added')
              }
          })
      }
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
                            <Tab eventKey={1} title="Add Songs">
                            <div>
                                <Form  className="form-container" horizontal  onSubmit={this.handleSubmit}> 
                                
                                
                                    <FormGroup>
                                         
                                            <Col sm={12}>
                                           <FormControl type="text" id="artistName" placeholder="Artist Name" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                         
                                            <Col sm={12}>
                                           <FormControl type="text" id="songName" placeholder="Song Name" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        
                                            <Col sm={12}>
                                           <FormControl type="text" id="url" placeholder="Url" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={12}>   
                                        <Button type="submit" id="submitButton"  className="btnBlue" vertical block>Submit</Button>
                                        </Col>
                                    </FormGroup>

                                   

                                </Form>
                                </div>
                            </Tab>
                        </Tabs>
                </div>

               

                </Col>
                <Col xs={12} sm={6} md={6}>
                <div className="centerImage">
                    <div   style={padd}>       
                        <Image src="/images/logo.png" rounded className="centerImage"  style={padd}/>
                    </div>
                </div>
                </Col>
            </Row>
            </Grid>
        </div> 
        </div>
                            
            );
        }
    }

export default AddSongs;