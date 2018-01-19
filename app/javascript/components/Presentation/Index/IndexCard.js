import React from 'react';

const dropdownContent = {
    position: "absolute",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    padding: "10px",
    zIndex: "3px",
}

class IndexCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = { show: false }

    }

    toggleDropdown = () => {
        this.setState({ show: !this.state.show })
    }

    render() {
        const { presentation, cardStyle, theme } = this.props
        const display = this.state.show ? "block" : "none"

        return (
            <div className="col-3">
                <div className="card mt-1" style={{ ...cardStyle }}>
                    <div className="row">
                        <h5 className="ml-3 mr-auto"> {presentation.name} </h5>
                        <button onClick={() => this.toggleDropdown()} className="btn dropdown-toggle mt-0 mr-2 px-2 py-0" />
                    </div>
                    <div style={{ dropdownContent, display }}>
                        <a onMouseLeave={() => this.setState({ show: false })} className="btn btn-outline-warning"> Delete </a>
                    </div>
                    <div className="row justify-content-center mt-auto">
                        <div className="btn-group-sm">
                            <a href={`/share/${presentation.id}`} className="btn btn-primary px-3"> Start </a>
                            <a href={`/presentations/${presentation.id}`} className="btn btn-outline-secondary mx-1">Preview</a>
                            <a href={`presentations/${presentation.id}/edit`} className="btn btn-outline-secondary mr-1"> Edit </a>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
};

export default IndexCard;