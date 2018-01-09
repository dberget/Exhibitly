import React, { Component } from 'react';

const cardStyle = {
    width: "17rem",
}

const dropdownContent = {
    position: "absolute",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    padding: "12px 16px",
    zIndex: "1",
}

class PresentationIndex extends Component {
    constructor(props) {
        super(props)

        this.state = { show: false }
    }

    toggleDropdown = () => {
        this.setState({ show: !this.state.show })
    }

    render() {
        const { show } = this.state
        const display = show ? "block" : "none"

        return (
            this.props.presentations.map((presentation) =>
                <div onMouseLeave={() => this.setState({ show: false })} className="card" style={cardStyle}>
                    <h4 className="ml-1"> {presentation.name} </h4>
                    <div className="w-15">
                        <button onClick={this.toggleDropdown} className="btn btn-outline-secondary dropdown-toggle">
                            Actions
                    </button>
                        <div className="btn-group-sm" style={{ ...dropdownContent, display }}>
                            <a href={`/share/${presentation.id}`} className="btn btn-primary"> New </a>
                            <a href={`/presentations/${presentation.id}`} className="btn btn-secondary mx-1">Preview</a>
                            <a href={`presentations/${presentation.id}/edit`} className="btn btn-secondary mr-1"> Edit </a>
                            <a className="btn btn-warning"> Delete </a>
                        </div>
                    </div >
                </div >
            )
        );
    }
}

export default PresentationIndex;