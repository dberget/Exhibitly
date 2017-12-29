import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FilterNav extends Component {
    render() {
        return (
            <ul className="nav nav-pills navbar-light navbar-expand-lg pt-3 pb-1 border border-top-0 border-right-0 border-left-0">
                {this.props.account_tags.map((tag) =>
                    <li className="nav-item mr-1">
                        <a className={`nav-link ${this.props.filters.includes(tag) ? "active" : ""}`} onClick={this.props.handleClick.bind(this, tag)}> {tag} </a>
                    </li>
                )}
                <li className="mr-auto"></li>
                {this.props.samples.map((sample) =>
                    <li className="nav-item">
                        <a className="nav-link" onClick={this.props.handleClick.bind(this, sample.title)}> {sample.title} </a>
                    </li>
                )}
                <li>
                    <a className="nav-link" onClick={this.props.handleClick.bind(this, "")}> All </a>
                </li>
            </ul>
        );
    }
}

FilterNav.propTypes = {
};

export default FilterNav;