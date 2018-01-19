import React, { Component } from 'react';
import PropTypes from 'prop-types';

function withTheme(testing) {
    return function (WrappedComponent) {
        return class extends Component {
            constructor(props) {
                super(props)

                this.state = {
                    theme: {}
                }
            }

            componentDidMount() {
                this.setState({ theme: { primary: "#f9f9f9", secondary: "#eee" } })
            }

            render() {
                return (
                    <WrappedComponent theme={this.state.theme} {...this.props} />
                );
            }
        }
    }
}

export default withTheme