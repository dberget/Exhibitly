import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SampleCard from './SampleCard'
import FilterNav from './FilterNav'

class Samples extends React.Component {
  constructor(props) {
    super(props)

    this.state = { entries: [], filters: [] }

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    this.setState({ entries: this.props.samples })
  }


  handleClick(newFilter) {
    const { filters } = this.state
    let newFilters
    const index = filters.map(x => x).indexOf(newFilter)

    if (index === -1) {
      newFilters = filters.concat(newFilter)
    } else {
      filters.splice(index, 1)
      newFilters = filters
    }

    this.setState({
      filters: newFilters
    })
  }


  list = () => {
    const { filters } = this.state

    let filteredSamples =
      filters.length
        ? this.state.entries.filter((sample) => {
          return sample.tags.some(s => this.state.filters.indexOf(s) > -1)
        })
        : this.props.samples


    return (
      filteredSamples.map((sample) =>
        <SampleCard {...sample} key={sample.id} />
      )
    )
  }

  render() {
    const { samples, account_tags } = this.props

    return (
      <div className="container-fluid bg-light" >
        <FilterNav handleClick={this.handleClick} filters={this.state.filters} samples={samples} account_tags={account_tags} />
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