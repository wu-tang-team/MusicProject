import React, { Component } from 'react';
import {Image} from 'react-bootstrap';
import './Jumbotron.css';
// import Navbar from '../components/Navbar.jsx';
// import Footer from '../components/Footer.jsx';


class Jumbotron extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid"> 
                <div className="container">
                <a href="/"><Image  src="/images/logo.png" center /></a>
                    {/* <h1 className="display-3">{this.props.title}</h1> */}
                    {/* <p className="lead">{this.props.subtitle}</p>  */}
                </div>
            </div> 
        );
    }
}



export default Jumbotron