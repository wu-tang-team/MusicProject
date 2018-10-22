import React, { Component } from 'react';
import Navbar from '../components/CustomNavbar';
import Footer from '../components/Footer';
import Jumbotron from '../components/Jumbotron';
import { Grid, Row, Col,ListGroup, ListGroupItem, Form, FormGroup, FormControl, Button, PanelGroup, Panel} from 'react-bootstrap';
import ReactYoutube from '../thirdParty/ReactYoutube';
import axios from 'axios';
import './styles.css';
import Comments from '../components/Comments'


const bgBlue= {
    background: '#1c0e3e',
  };
  const textBlue= {
    color: '#1c0e3e',
  };
  class Home extends Component {
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
            allSongsList:[],
            allUsersList:[],
            allConcertsList:[],
            currentSongId:'',
            currentTrackId: '',
            currentSongName:'',
            currentComments: [],
            songIndex: {}     
        };
    }



    shuffle = (array) => {
        
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        this.setState({ allSongsList: array });
        return array;
    }
    getAllSongsUpdate = () => {
        axios.get(`http://localhost:3001/users/allSongs`)
        .then(res => { 
            this.setState({ allSongsList: res.data });
        })
    }
    getAllSongs = () => {
        axios.get(`http://localhost:3001/users/allSongs`)
          .then(res => { 
              console.log("2222222222222222222222222222222222")
              console.log(res.data);
              var test = res.data[0].URL;
              if (test.includes('v=')) {
                var temp1= res.data[0].URL.split('v=').pop();
                if (temp1.includes('&')){
                    var temp2 = temp1.split('&');
                    temp1 = temp2[0];
                }
                console.log(res.data[0].UserId)
                    this.setState({ currentTrackId: res.data[0].UserId})
                    this.setState({ currentComments: res.data[0].comments})
                    this.setState({ currentSongId: temp1 });
                    this.setState({ currentSongName: res.data[0].SongName})
              } else {
                  var temp3 = test.split('/').pop()
                  this.setState({ currentSongId: temp3 });
                  this.setState({ currentTrackId: res.data[0].UserId})
                  this.setState({ currentComments: res.data[0].comments})
                  this.setState({ currentSongName: res.data[0].SongName})
              } 
              this.setState({ allSongsList: res.data });
          })
    }
    
    getAllUsers = () => {
        axios.get(`http://localhost:3001/users/allusers`)
          .then(res => { 
            console.log(res.data, "-----getAllUsers")
              this.setState({ allUsersList: res.data  });
          })
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
        this.getAllUsers()
        this.getAllSongs();
        this.getAllConcerts();
    }
    getAllConcerts = () => {
        console.log('GetAllConcerts')
        axios.get(`https://api.songkick.com/api/3.0/metro_areas/23068-us-phoenix/calendar.json?apikey=io09K9l3ebJxmxe2`)
        .then(res => { 
          console.log(res.data.resultsPage.results.event, "-----getAllConcerts")
            this.setState({ allConcertsList: res.data.resultsPage.results.event });
        })
  }
        
    
   stripIt(url){
        if (url.includes('v=')) {
            var temp1= url.split('v=').pop();
            if (temp1.includes('&')){
                var temp2 = temp1.split('&');
                temp1 = temp2[0];
            }
                return temp1
          } else {
              var temp3 = url.split('/').pop()
              return temp3;
          }
    }
    handleSongChange(song){
      console.log(song, '%%%%%%%%%%%%%%%%%%%%%%%%%%%')
       this.setState({currentSongId: this.stripIt(song.URL)});
       this.setState({currentSongName: song.SongName});
       this.setState({currentTrackId: song.UserId});
       axios.get(`http://localhost:3001/users/thissongcomments/` + song.UserId)
       .then(res => {
         console.log('newcomments________', res.data);
         this.setState({currentComments: res.data})
       })
        
    }

    handleSubmit = event => {
        event.preventDefault();
        
        var songComment= document.getElementById('songComment').value;
        var songId = this.state.currentTrackId;
        var userId = this.state.user.userid;
        var owner = this.state.user.uname;
        this.getAllUsers();

        var postURL= 'http://localhost:3001/users/postcomment/';
        axios.post(postURL, {
           Comment: songComment,
           TrackId: songId,
           Owner: userId,
           ownerName: owner
        }).then(comments => {
            document.getElementById('songComment').value = '';
            // const newArray = [];
          
            console.log('~~~~~~~~~~')
            console.log( comments.data)
            this.setState({currentComments : comments.data})
        })
        
 
      }

    render() {
        
        return (
            <div >
                 <Jumbotron title="Profile" subtitle="User Profile" />
                <Navbar />
                <div className="container"  style={bgBlue}>
                    <h2>Welcome, <span>{this.state.user.uname}</span></h2>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col sm={12} md={3}  className="col-design">
                                <h2>Users</h2>
                              <div className="users-container">
                                <PanelGroup accordion id="accordion-example">
                                    {this.state.allUsersList.map((user, index) => (
                                        <Panel eventKey={user.Username}>
                                            <Panel.Heading>
                                                <Panel.Title toggle>  
                                                    <a key={index}>{user.Username}</a>
                                                </Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body collapsible >
                                                <ListGroup>
                                                    {user.songs.map((song, index) => (
                                                        <ListGroupItem key={index}>
                                                            <a className="inner-video" onClick={() => this.handleSongChange(song)}>
                                                              {song.SongName}
                                                            </a>
                                                        </ListGroupItem>
                                                    ))}
                                                </ListGroup>
                                            </Panel.Body>
                                        </Panel>
                                    ))}
                                </PanelGroup>
                              </div>
                            </Col>
                            <Col sm={12} md={6}>
                                <h2>{this.state.currentSongName}</h2>
                                <ReactYoutube videoId={this.state.currentSongId}/>
                                <h2>Comments</h2>
                                  <div  className="comments-container">
                                    <Comments comms={this.state.currentComments}/>
                                    <Form className="form-container" horizontal onSubmit={this.handleSubmit}> 
                                        <FormGroup>
                                        <Col sm={12}>
                                            <FormControl type="text" id="songComment" placeholder="make a comment" required/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                        <Col sm={12}>
                                            <Button type="submit" id="submitButton" className="btnBlue" vertical block>
                                                Submit
                                            </Button>
                                            </Col>
                                        </FormGroup>
                                        
                                    </Form> 
                                    <h2 style={textBlue}>Local Concerts</h2>
                                    <div className="concert-listings">
                                    <ul className="concert-row">
                                    {this.state.allConcertsList.map(event => {return <li> {event.displayName}</li>})}
                                    </ul>
                                   </div>  
                                  </div>  

                               
                            </Col>
                            <Col sm={12} md={3} className="col-design">
                                <h2>Playlist</h2>
                                <div  className="playlist-container">
                               <ListGroup>
                                    {this.state.allSongsList.map((song, index) => (
                                         <ListGroupItem key={index}>
                                            <a className="btn-video" onClick={( )=>this.handleSongChange(song)}>
                                                {song.SongName}
                                            </a>
                                        </ListGroupItem>
                                    )
                                    )}
                                </ListGroup>
                                </div>
                                
                            </Col>
                        </Row>
                    </Grid>

                </div>
                <Footer />
            </div>

        );
    }
}
export default Home;