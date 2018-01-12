import React, { Component } from 'react';
import IndexCard from './IndexCard'

const cardStyle = {
    width: "15rem",
    height: "10rem",
    marginTop: "5px",
    padding: "1rem",
}


const PresentationIndex = ({ presentations }) => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-3">
                    <a href="presentations/new">
                        <div className="card align-items-center" style={cardStyle}>
                            <div className="row">
                                <div className="col align-items-center">
                                    <p> Create New Template </p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                {presentations.map((presentation) =>
                    <IndexCard presentation={presentation} cardStyle={cardStyle} />
                )}
            </div>
        </div>
    );
}

export default PresentationIndex;