import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { ListGroupItem, Button } from 'reactstrap';

class Task extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        task: PropTypes.string.isRequired,
        onDelete: PropTypes.func.isRequired,
        deleting: PropTypes.arrayOf(PropTypes.string),
    }

    static defaultProps = {
        deleting: [],
    }

    onDeleteClick = (e) => {
        e.preventDefault();
        this.props.onDelete(this.props.id);
    }

    isDeleting = () => {
        const { id, deleting } = this.props;
        return !isEmpty(deleting.filter(o => o === id)[0]);
    }

    render() {
        const { task } = this.props;
        const isDeleting = this.isDeleting();

        return (
            <ListGroupItem>
                <div className="row">
                    <div className="col-md-1">
                        <Button
                            type="button"
                            onClick={this.onDeleteClick}
                            disabled={isDeleting}
                            color="danger"
                            size="sm"
                            block
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </div>
                    <div className="col-md-11">
                        <p>{task}</p>
                    </div>
                </div>
            </ListGroupItem>
        );
    }
}

export default Task;