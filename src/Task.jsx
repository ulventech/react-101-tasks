import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Task extends PureComponent {
    static propTypes = {
        task: PropTypes.string.isRequired,
    }

    render() {
        const { task } = this.props;

        return (
            <h3>{task}</h3>
        );
    }
}

export default Task;
