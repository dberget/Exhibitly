import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FilterNav extends Component {
    render() {
        return (
            <div className="navbar navbar-light navbar-expand-lg pt-3">
                {this.props.account_tags.map((tag) =>
                    <button type="button" className={`nav-item btn btn-outline-primary mr-1 ${this.props.filters.includes(tag) ? "active" : ""}`} onClick={this.props.handleClick.bind(this, tag)}> {tag} </button>
                )}
                {this.props.samples.map((sample) =>
                    <button type="button" className="nav-item btn btn-outline-primary mr-1" onClick={this.props.handleClick.bind(this, sample.title)}> {sample.title} </button>
                )}
                <button type="button" className="nav-item btn btn-primary mr-1" onClick={this.props.handleClick.bind(this, "")}> All </button>
                <form class="form-inline ml-auto my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        );
    }
}

FilterNav.propTypes = {
};

export default FilterNav;