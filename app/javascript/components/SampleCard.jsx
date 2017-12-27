import React, { Component } from 'react';
import Modal from './Modal'
import ModalWrapper from './ModalWrapper'

class SampleCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false
        }

    }

    handleModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible })
    }

    render() {
        const { title, body, url, id, tags } = this.props
        return (
            <div className="card" style={{ height: "15rem", width: "30rem", margin: "1rem auto" }}>
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">{body}</p>
                </div>
                <div className="card-footer">
                    <button type="button" onClick={this.handleModal} className="btn btn-primary mr-1">Launch</button>
                    <a data-turbolinks="false" href={`samples/${id}`} className="btn btn-secondary"> Show </a>
                    <span className="ml-5"></span>
                    {tags.map((tag) =>
                        <span className="border mx-2 p-1"> {tag} </span>
                    )}
                </div>
                {
                    this.state.modalVisible ?
                        <ModalWrapper>
                            <Modal handleClose={this.handleModal} src={url} />
                        </ModalWrapper> :
                        null
                }
            </div >
        );
    }
}

export default SampleCard;