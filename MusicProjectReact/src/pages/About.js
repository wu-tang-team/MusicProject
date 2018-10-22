import React, { Component } from 'react';
import Navbar from '../components/CustomNavbar';
import Footer from '../components/Footer';
import Jumbotron from '../components/Jumbotron';
import './styles.css';

class About extends Component {
    render() {
        return (
            <div>
              <Jumbotron title="Wu-Tang Project" subtitle="share something witty here!" />
              <Navbar /> 
                <div className="container">
                    <h2>About</h2>
                    <p>
                        Lorem ipsum dolor
                    </p>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                        Lorem ipsum dolor
                    </p>
                    
                </div>
                 <Footer />
            </div>

        );
    }
}
export default About;