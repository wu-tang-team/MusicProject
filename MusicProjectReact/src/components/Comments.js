import React, { Component } from 'react';
import { } from 'react-bootstrap';
import './Comments.css';
import '../pages/styles.css';
class Comments extends Component {

    render() {
        
        return (
            <div>
                <ul>
                    {this.props.comms.map((comment, index) => (
                        <li><span style={{ color:"#1168c7"}}> <strong>{comment.ownerName}:</strong> </span>{comment.Comment} </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default Comments

