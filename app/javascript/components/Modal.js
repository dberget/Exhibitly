import React from 'react';

const Modal = ({ handleClose, src }) => {
    return (
        <div onClick={handleClose} className="modal-overlay-div">
            <div className="modal-content-div mt-5">
                <iframe scrolling="no" frameBorder="no" width="800" height="600" src={src} />
                <div className="modal-dialog-div">
                    <button className="btn btn-primary" onClick={handleClose}> Close </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;