import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem} from 'react-bootstrap';
// import axios from 'axios';
import './Videos.css';

class Videos extends Component {
    render() {
        return (
            
                                <ListGroup className="show-all-songs">
                                    {this.state.allSongsList.map((song, index) => (
                                         <ListGroupItem key={index}>
                                            <Button  onClick={( )=>this.handleSongChange(song)}>
                                                {song.SongName}
                                            </Button>
                                        </ListGroupItem>
                                    )
                                    )}
                                </ListGroup>


        );
    }
}

export default Videos