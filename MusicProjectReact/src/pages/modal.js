import React, { Component} from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            title: '',
            artist: '',
            web: '',
            msg: '',
        }
    }
    // next event
    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            artist: nextProps.artist,
            web: nextProps.web,
            msg: nextProps.msg,
        });
    }

    titleHandler(e) {
        this.setState({ title: e.target.value });
    }
    
    artistHandler(e) {
        this.setState({ artist: e.target.value });
    }
    
    webHandler(e) {
        this.setState({ web: e.target.value });
    }
    
    msgHandler(e) {
        this.setState({ msg: e.target.value });
    }
    
    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item)
    }

    render() {
        return (
            <div className="modal fade" id="#userSongModal" tabIndex="-1" role="dialog" aria-labelledby="userSongModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="userSongModalLabel">Edit List</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><span className="modal-lable">Title:</span><input value={this.state.title} onChange={(e) => this.titlehandler(e)} /></p>
                            <p><span className="modal-lable">Artist</span><input value={this.state.artist} onChange={(e) => this.artistHandler(e)} /></p>
                            <p><span className="modal-lable">web:</span><input value={this.state.web} onChange={(e) => this.webHandler(e)} /></p>
                            <p><span className="modal-lable">Msg:</span><input value={this.state.msg} onChange={(e) => this.msgHandler(e)} /></p>
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secontary" data-dismiss="modal">Close</button>
                            <button type="button" className="bitn btn-primary" data-dismiss="modal" onClick={() => {this.handleSave() }}> Save Changes</button>
                        </div>                    
                    </div>  
                </div>
            </div>
        )
    }

}

export default Modal;