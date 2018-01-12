import React, { Component } from 'react';

class MainNav extends Component {
    render() {
        return (
            <div className="wrapper">
                <nav id="sidebar">
                    <div className="sidebar-header nav navbar-brand">
                        Company Name
                    </div>
                    <ul className="list-unstyled link">
                        <li className="active">Presentations</li>
                        <li>
                            <a href="/presentations">Templates</a>
                        </li>
                        <li>Shared Links</li>
                        <li>Samples</li>
                        <li>Account</li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default MainNav;