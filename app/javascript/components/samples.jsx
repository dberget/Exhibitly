import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Samples extends React.Component {
  constructor(props) {
    super(props)

    this.state = { filter: "Toro" }


    this.handleClick = this.handleClick.bind(this)
    this.list = this.list.bind(this)
  }


  handleClick(newFilter) {
    this.setState({
      filter: newFilter
    })
  }


  list() {
    let list = this.props.samples.filter(sample => sample.title == this.state.filter)

    return (
      list.map((sample) =>
        <ul>
          <li> {sample.title} </li>
          <li> {sample.body} </li>
        </ul>
      )
    )
  }

  render() {
    const { samples } = this.props

    return (
      <div>
        <button className="btn btn-primary mr-1" onClick={this.handleClick.bind(this, "Hormel")}> Hormel </button>
        <button className="btn btn-primary" onClick={this.handleClick.bind(this, "Toro")}> Toro </button>
        {this.list()}
      </div >
    );
  }
}

Samples.defaultProps = {
  samples: []
}

Samples.propTypes = {
  samples: PropTypes.array
}

export default Samples