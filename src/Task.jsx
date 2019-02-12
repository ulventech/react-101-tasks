import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';

class Task extends PureComponent {
    static propTypes = {
        task: PropTypes.string.isRequired,
    }

    render() {
        const { task } = this.props;

        return (
            <ListGroupItem>
                {task}
            </ListGroupItem>
        );
    }
}

export default Task;
