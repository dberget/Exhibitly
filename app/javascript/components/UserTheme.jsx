import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';


class UserTheme extends Component {
    constructor(props) {
        super(props)

        this.state = {
            theme: {}
        }
    }

    componentDidMount() {
        this.setState({ theme: { primary: "#000", secondary: "#eee" } })
    }

    render() {
        return (
            <Fragment>
                {this.props.render(this.state)}
            </Fragment>
        );
    }
}

export default UserTheme