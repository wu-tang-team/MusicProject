import React, { Component } from 'react';
import {Col, Form, FormGroup, FormControl, Checkbox, Button} from 'react-bootstrap';
// import { browserHistory } from 'react-router';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import './Login.css';
import '../pages/styles.css';



class LoginTab extends Component {


    state = {
        name: '',
        password:''
      }

      handleChange = event => {
        this.setState({ name: event.target.value });
      }
    
      handleChange2 = event => {
        this.setState({ password: event.target.value });
      }
      setResult = (data) => {
          console.log(data)

        localStorage.setItem( 'firstName', data.FirstName);
        localStorage.setItem( 'lastName', data.LastName);
        localStorage.setItem( 'email', data.Email);
        localStorage.setItem( 'userName',data.Username);
        localStorage.setItem( 'userId', data.UserId);
        localStorage.setItem( 'newUser', data.newUser);
        
        // 
      }
      handleSubmit = event => {
        event.preventDefault();
    
        // const user = {
        //   name: this.state.name,
        //   password: this.state.password

        // };
    
        axios.post(`http://localhost:3001/users/login`, {
            username: this.state.name,
            password: this.state.password
        })
          .then(res => { 
              console.log(res.data)
                this.setResult(res.data)
                if (res.data.newUser=== false){
                    this.props.history.push('/profile')
                } else{
                    this.props.history.push('/addSongs')
                }
          })
      }

    


    render() {
        return (
            <div>
                 <Form  className="form-container" horizontal onSubmit={this.handleSubmit}>
            
                    <FormGroup>
                      
                        <Col sm={12}>
                        <FormControl type="string" name="username" placeholder="Username" onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                
                        <Col sm={12}>
                       <FormControl type="password" placeholder="Password" onChange={this.handleChange2}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                        <Checkbox className="checkBoxColor">Remember me</Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={12}>   
                        <Button type="submit" id="submit"  className="btnBlue" vertical block>Sign in</Button>
                        </Col>
                    </FormGroup>

                     <hr/>
                    <center><h4>OR</h4></center>

                    <FormGroup>
                        <Col sm={12}>   
                        <Button type="submit" id="submitOAuth" className="btnPurple" vertical block>Github</Button>
                        </Col>
                    </FormGroup>

                </Form>
                </div>
                            
            );
        }
    }

export default withRouter(LoginTab);