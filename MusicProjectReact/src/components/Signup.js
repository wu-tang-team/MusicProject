import React, { Component } from 'react';
import { Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
// import { browserHistory } from 'react-router';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import './Login.css';
import '../pages/styles.css';



class SignupTab extends Component {

    state = {
        username: '',
        firstname:'',
        lastname:'',
        email:'',
        password:''
       
      }

      handleChange = event => {
        this.setState({ username: event.target.value });
      }


      handleChange2 = event => {
        this.setState({ firstname: event.target.value });
      }
    
      handleChange3 = event => {
        this.setState({ lastname: event.target.value });
      }

      handleChange4 = event => {
        this.setState({ email: event.target.value });
      }

      handleChange5 = event => {
        this.setState({ password: event.target.value });
      }

      


      handleSubmit = event => {
        event.preventDefault();
    console.log('submit^^^^^^^^^^^^^^^')
        // const user = {
        //   name: this.state.name,
        //   password: this.state.password

        // };
    
        axios.post(`http://localhost:3001/users/signup`, {
            username: this.state.username,
            firstName:this.state.firstname,
            lastName:this.state.lastname,
            email: this.state.email,
            password: this.state.password
            
            
        })
          .then(res => { 
              console.log(res.data)
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
 <Form className="form-container" horizontal onSubmit={this.handleSubmit}>

                                
                                        <FormGroup>

                                            <Col sm={12}>
                                            <FormControl type="text" id="Username" placeholder="Username" onChange={this.handleChange} required/>

                                            </Col>
                                        </FormGroup>
                                        <FormGroup>

                                            <Col sm={12}>
                                                <FormControl type="text" id="FirstName" placeholder="First Name" onChange={this.handleChange2} required/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>

                                            <Col sm={12}>
                                                <FormControl type="text" id="LastName" placeholder="Last Name"  onChange={this.handleChange3} required/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col sm={12}>
                                                <FormControl type="text" id="Email" placeholder="Email" onChange={this.handleChange4} required/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalPassword">

                                            <Col sm={12}>
                                                <FormControl type="text" id="Password" placeholder="Password" onChange={this.handleChange5} required />
                                            </Col>
                                        </FormGroup>
                                    

                                        <FormGroup>
                                            <Col sm={12}>
                                                <Button type="submit" id="submit" className="btnBlue" vertical block>Sign up</Button>
                                            </Col>
                                        </FormGroup>



                                    </Form>

            </div>

        );
    }
}
export default withRouter(SignupTab);
