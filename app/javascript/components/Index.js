import React from "react"
import PropTypes from "prop-types"
import Samples from './samples'

class Index extends React.Component {
  render() {
    return <Samples sample={this.props.samples} />;
  }
}

export default Index
