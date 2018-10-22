import React, { Component } from 'react';
import Navbar from '../components/CustomNavbar';
import Footer from '../components/Footer';
import Jumbotron from '../components/Jumbotron';
import { Grid, Row, Col,Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import axios from 'axios';
import './styles.css';



const bgBlue= {
    background: '#1c0e3e',
  };

class Update extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            user : {
                fname: '',
                lname: '',
                uname: '',
                userid: 0,
                email: ''    
            },
            mySongs:[]
              
        };
    }

    getMySongs = (ID) => {
        axios.get(`http://localhost:3001/users/mysongs/` + ID)
          .then(res => { 
              console.log("2222222222222222222222222222222222")
              console.log(res.data);
              this.setState({
                  mySongs: res.data 
              })
              
          })
    }
    handleSubmit = event => {
        event.preventDefault();
        
        var ArtistName = document.getElementById('artistname').value;
        var SongName= document.getElementById('songname').value;
        var URL= document.getElementById('url').value;
        var Owner= document.getElementById('owner').value;
        var UserId= document.getElementById('userid').value;

        var postURL= 'http://localhost:3001/users/song/' + UserId;
        console.log(UserId, '***^^^')
        axios.put(postURL, {
           ArtistName: ArtistName,
           SongName: SongName,
           URL: URL,
           Owner: Owner,
           UserId: UserId
        }).then(res => {
            var url = 'http://localhost:3001/users/deletesongcomments/' + UserId;
            axios.delete(url, {
                TrackId: UserId
            }).then(res => {

            })
        })
        
 
      }
    
    componentDidMount() {
        var fName=localStorage.getItem('firstName');
        var lName=localStorage.getItem('lastName');
        var uName=localStorage.getItem('userName');
        var userId=localStorage.getItem('userId');
        var email=localStorage.getItem('email');
        console.log(userId, '<<<')
        
        this.setState({
            user : {
                fname: fName,
                lname: lName,
                uname: uName,
                userid: userId,
                email: email

            }
        })
        console.log(this.state.userid, '<<<<<');
        this.getMySongs(userId);
    }

    render() {
        
        return (
            <div >
                 <Jumbotron title="Profile" subtitle="User Profile" />
                <Navbar />
                <div className="container"  style={bgBlue}>
                <h2>Update Songs</h2>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col sm={12} md={2}  className="col-design">
                               
                            </Col>
                            <Col sm={12} md={8}>
                                    

                                    <div className="login-form">
                                        {this.state.mySongs.map(song=>{
                                            return (
                                                <Form  className="form-container"  horizontal  onSubmit={this.handleSubmit}> 
                                
                                
                                                <FormGroup>
                                                     
                                                        <Col sm={12}>
                                                       <FormControl type="text" id="artistname" placeholder={song.ArtistName} required />
                                                    </Col>
                                                </FormGroup>
            
                                                <FormGroup>
                                                     
                                                        <Col sm={12}>
                                                       <FormControl type="text" id="songname" placeholder={song.SongName}  required/>
                                                    </Col>
                                                </FormGroup>
            
                                                <FormGroup>
                                                    
                                                        <Col sm={12}>
                                                       <FormControl type="text" id="url" placeholder={song.URL} required/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup className="hide">
                                                    
                                                    <Col sm={12}>
                                                   <FormControl type="text" id="owner" value={song.Owner} />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup  className="hide">
                                                        
                                                        <Col sm={12}>
                                                    <FormControl type="text" id="userid" value={song.UserId} />
                                                    </Col>
                                                </FormGroup>
            
                                                <FormGroup>
                                                    <Col sm={12}>   
                                                    <Button type="submit" id="submitButton"  className="btnBlue" vertical block>Update This Song</Button>
                                                    </Col>
                                                </FormGroup>
            
                                               
            
                                            </Form>
                                            )
                                        })}
                                    </div>
                            </Col>
                            <Col sm={12} md={2} className="col-design">
                              
                            </Col>
                        </Row>
                    </Grid>

                </div>
                <Footer />
            </div>

        );
    }
}
export default Update;