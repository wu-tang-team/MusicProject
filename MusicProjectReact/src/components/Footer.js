import React, { Component } from 'react';
import './Footer.css';


var style = {
    backgroundColor: "#1c0e3e",
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "40px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '10px',
  height: '40px',
  width: '100%',
}

class Footer extends Component {
    render() {
        return (
            <footer>
            <div style={phantom} />
            <div style={style}>
            <span className="text-copyright">  Team Wu-Tang Project &#169;{new Date().getFullYear()}</span>
            </div>
        </footer>

           
          

        );
    }
}




export default Footer;