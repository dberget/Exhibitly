import React, { Component } from "react"
import PropTypes from "prop-types"

let uniq = a => [...new Set(a)]

class FilterNav extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    samples: PropTypes.array.isRequired,
    accountTags: PropTypes.array.isRequired
  }

  render() {
    const tags = uniq(this.props.accountTags)

    return (
      <ul className="nav nav-pills navbar-light navbar-expand-lg pt-3 pb-1 border border-top-0 border-right-0 border-left-0">
        {tags.map(tag => (
          <li className="nav-item mr-1">
            <a
              className={`nav-link ${
                this.props.filters.includes(tag) ? "active" : ""
              }`}
              onClick={this.props.handleClick.bind(this, tag)}
            >
              {tag}
            </a>
          </li>
        ))}
      </ul>
    )
  }
}

FilterNav.defaultProps = {
  filters: []
}

export default FilterNav
