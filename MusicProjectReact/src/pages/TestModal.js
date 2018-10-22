import React, { Component } from 'react'; 
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 
import Jumbotron from '../components/Jumbotron';
import {Grid, Row, Col, Button, Modal} from 'rt-bootstrap'; 
import ReactYoutube from '../thirdParty/ReactYoutube';

class TestModal extends Component {     
    
    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        
        this.state = { show: false };
    }           
        
        handleClose() {   
            this.setState({ show: false });
        } 
       
        handleShow() {
            this.setState({ show: true });
        }    

render() {  
    return(
        <div>
        <Jumbotron title="Login" subtitle="User Profile" />
        <Navbar />
        <div className="container">
            <h2>Profile</h2>
            <h2>Welcome</h2>
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={4} lg={3}>
                    <h2>Users</h2>
                    <h3>
                        <ol>
                        <li>
                        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}> User 1 </Button>             
                            <Modal show={this.state.show} onHide={this.handleClose}>          
                                <Modal.Header>
                                    <Modal.Title>User1's Songs</Modal.Title>                                     
                                </Modal.Header>                     
                                <Modal.Body>Media List...                                         
                                <ol>
                                    <li>
                                        <Button bsStyle="link" to= "C:\Users\indigenW7\Desktop\WozU Files\Week 3 React-Course\React Class Videos\jsx\imaginerium.mp4">try</Button>
                                    </li>
                                    <li>
                                        <Button bsStyle="link" videoId='o6kKCmaEbvs'>place</Button>
                                    </li>
                                    <li>
                                        <Button bsStyle="link" videoId='_nBlN9yp9R8'>real</Button>
                                        <Button bsStyle="link" ><ReactYoutube videoId='_nBlN9yp9R8'/>real</Button>
                                    </li>
                                </ol>                                                                             
                                </Modal.Body>
                                
                                <Modal.Footer>                                     
                                <Button onClick={this.handleClose}>Close</Button>           </Modal.Footer>                                 
                            </Modal>   
                        </li>
                        <li>
                        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow2}> User 2 </Button>             
                            <Modal show={this.state2.show2} onHide={this.handleClose2}>          
                                <Modal.Header>
                                    <Modal.Title>User2's Songs</Modal.Title>                                     
                                </Modal.Header>                     
                                <Modal.Body>Media List...                                         
                                <ol>
                                    <li>
                                        <Button bsStyle="link" to= "ReactYoutube videoId='Edwsf-8F3sI'">tru</Button>
                                    </li>
                                    <li>
                                        <Button bsStyle="link" videoId='o6kKCmaEbvs'>place</Button>
                                    </li>
                                    <li>
                                        <Button bsStyle="link" videoId='_nBlN9yp9R8'>real</Button>
                                    </li>
                                </ol>                                                                             
                                </Modal.Body>
                                
                                <Modal.Footer>                                     
                                <Button onClick={this.handleClose2}>Close</Button>           </Modal.Footer>                                 
                            </Modal>
                        </li>
                        <li>
                            <Button bsStyle="link">User 3</Button>
                        </li>
                        </ol>
                    </h3>
                    </Col>
                    <Col xs={12} md={8} lg={6}>
                    <h3>Video</h3>
                    <ReactYoutube videoId='Edwsf-8F3sI'/>
                    </Col>
                    <Col xs={12} md={3} lg={3}>
                        <h2>Videos</h2>
                    
                        <h3>
                            <ol>
                            <li>
                                <Button bsStyle="link">Song 1</Button>
                            </li>
                            <li>
                                <Button bsStyle="link">Song 2</Button>
                            </li>
                            <li>
                                <Button bsStyle="link">Song 3</Button>
                            </li>
                            </ol>
                        </h3>
                        <Button bsStyle="primary">Add Friend</Button>
                        
                </Col>      
            </Row>                     
        </Grid>                                     
        </div> 
    <Footer />
</div>
);
}
}
export default TestModal;
                        