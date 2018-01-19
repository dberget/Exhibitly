import React, { Component } from 'react';
import IndexCard from './IndexCard'
import withTheme from '../../WithTheme'

const cardStyle = {
    width: "15rem",
    height: "10rem",
    marginTop: "5px",
    padding: "1rem",
}


const PresentationIndex = ({ presentations, theme }) => {
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
                    <IndexCard presentation={presentation} cardStyle={cardStyle} theme={theme} />
                )}
            </div>
        </div>
    );
}

const themedPresentationIndex = withTheme(null)(PresentationIndex)

export default themedPresentationIndex;