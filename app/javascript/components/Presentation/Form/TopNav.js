import React from 'react';

const style = {
    marginBottom: 5
}

const FormNav = ({ handleNameChange, handleCardFormat, presentationName, handleSaveClick, id, cardFormat }) => {
    return (
        <nav style={style} className="navbar navbar-light bg-light">
            <a className="navbar-brand"> {id ? "Editing" : "Creating"} Presentation </a>
            <button onClick={handleCardFormat} className="navbar-toggler" type="button"> {cardFormat ? "Condensed" : "Expand"} </button>
            {/* <form className="form-inline"> */}
            {/* <input className="form-control mr-sm-2" onChange={handleNameChange} value={presentationName ? presentationName : ""} /> */}
            {/* </form> */}
            <a className="btn btn-warning mr-2 ml-auto" href={`/presentations`} > Back  </a>
            <a className={`btn btn-outline-primary ${id ? "" : "disabled"} mr-2`} onClick={handleSaveClick} href={`/presentations/${id}`} > View  </a>
            <button className="btn btn-outline-success" type="button" onClick={handleSaveClick}> Save </button>
        </nav >
    );
};

export default FormNav;