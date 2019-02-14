import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TC extends Component {
    render() {
        return (
            <div className="container">
                <p>TC and stuff</p>
                <br />
                <br />
                <br />
                <Link to="/">
                    Back to task list
                </Link>
            </div>
        );
    }
}

export default TC;
