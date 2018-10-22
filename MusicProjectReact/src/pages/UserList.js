import React, { Component } from 'react';
import Modal from './modal';


class UserList extends Component {
    constructor(props) {
        super(props);

        this.replaceModalItem = this.replaceModalItem.bind(this);
        this.saveModalDetails = this.saveModalDetails.bind(this);
        this.state = {
          requiredItem: 0,
          brochure: [
                {
                    Title:" add title ",
                    Artist: "Add Artist, Authiur or Composer",
                    Web : "add Youtube, Vimeo, or private Media url  web location",
                    msg: "enter any relevant Details"
                },
                {
                    Title:" add title ",
                    Artist: "Add Artist, Authiur or Composer",
                    Web : "add Youtube, Vimeo, or private Media url  web location",
                    msg: "enter any relevant Details"
                },
                {
                    Title:" add title ",
                    Artist: "Add Artist, Authiur or Composer",
                    Web : "add Youtube, Vimeo, or private Media url  web location",
                    msg: "enter any relevant Details"
                },
                {
                    Title:" add title ",
                    Artist: "Add Artist, Authiur or Composer",
                    Web : "add Youtube, Vimeo, or private Media url  web location",
                    msg: "enter any relevant Details"
                },
                {
                    Title:" add title ",
                    Artist: "Add Artist, Authiur or Composer",
                    Web : "add Youtube, Vimeo, or private Media url  web location",
                    msg: "enter any relevant Details"
                }

            ]
        }
    }

    replaceModalItem(index) {
        this.setState({
          requiredItem: index
        });
      }
    
      saveModalDetails(item) {
        const requiredItem = this.state.requiredItem;
        let tempbrochure = this.state.brochure;
        tempbrochure[requiredItem] = item;
        this.setState({ brochure: tempbrochure });
      }
    
      deleteItem(index) {
        let tempBrochure = this.state.brochure;
        tempBrochure.splice(index, 1);
        this.setState({ brochure: tempBrochure });
      }

    render() {
        const brochure = this.state.brochure.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.title}</td>
                    <td>{" "} - {" "}</td>
                    <td>{item.artist}</td>
                    <td>{" "} - {" "}</td>
                    <td>{item.web}</td>
                    <td>{" "} - {" "}</td>
                    <td>{item.msg}</td>
                    <td>
                        <button className="btn btn-primary" data-toggle="modal" data-target="#userSongModal" onClick={() => this.replaceModalItem(index)}>edit</button>{" "}
                        <button claassName="btn btn-danger" onClick={() =>  this.deleteItem(index)}>remove
                        </button>
                    </td>
                </tr>
            )
        });

        const requiredItem = this.state.requiredItem;
        let modalData = this.state.brochure[requiredItem];
        return (
          <div>
            <div style={{ textAlign: "center" }}>
                <h1>Editable Song List</h1>
            </div>
            <table className="table table-striped">
                <tbody>
                    {brochure}
                </tbody>
            </table>
            <Modal
                title={modalData.title}
                artist={modalData.artist}
                web={modalData.web}
                msg={modalData.msg}
                saveModalDetails={this.saveModalDetails}
            />
        </div>
        );
    }
}

export default UserList;



