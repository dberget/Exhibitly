import React from 'react';

const style = {
    padding: '2.5rem',
    borderBottom: "solid lightgrey 1px",
}

const FormNav = ({ handleNameChange, presentationName, newName, handleSaveClick, id, cardFormat }) => {
    return (
        <div style={style} className="navbar navbar-light">
            <h1> {id ? "Editing" : "Creating"} {presentationName ? presentationName : "Presentation"} </h1>
            <form className="form-inline ml-auto">
                <input className="form-control mr-sm-2" onChange={handleNameChange} value={newName} />
            </form>
            <a className="btn btn-outline-warning mr-1" href={`/presentations`} > Back  </a>
            <a className={`btn btn-primary mr-1 ${id ? "" : "disabled"}`} onClick={handleSaveClick} href={`/presentations/${id}`} > View  </a>
            <button className="btn btn-success" type="button" onClick={handleSaveClick}> Save </button>
        </div>
    );
};

export default FormNav;

