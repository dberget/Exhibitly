import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SampleCard from './SampleCard'
import FilterNav from './FilterNav'

class Samples extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}


    this.handleClick = this.handleClick.bind(this)
    this.list = this.list.bind(this)
  }


  handleClick(newFilter) {
    this.setState({
      filter: newFilter
    })
  }


  list() {
    let list = []

    this.state.filter
      ? list = this.props.samples.filter(sample => sample.title == this.state.filter)
      : list = this.props.samples

    return (
      list.map((sample) =>
        <SampleCard {...sample} key={sample.id} />
      )
    )
  }

  render() {
    const { samples } = this.props

    return (
      <div className="container-fluid bg-light">
        <FilterNav handleClick={this.handleClick} />
        <div className="container-fluid pb-5">
          {this.list()}
        </div>
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