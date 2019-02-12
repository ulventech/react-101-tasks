import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem, Button } from 'reactstrap';

class Task extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        task: PropTypes.string.isRequired,
        onDelete: PropTypes.func.isRequired,
    }

    onDeleteClick = (e) => {
        e.preventDefault();
        this.props.onDelete(this.props.id);
    }

    render() {
        const { task } = this.props;

        return (
            <ListGroupItem>
                <Button
                    type="button"
                    onClick={this.onDeleteClick}
                >
                    Delete
                </Button>
                {task}
            </ListGroupItem>
        );
    }
}

export default Task;
