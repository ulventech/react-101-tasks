import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { ListGroupItem, Button } from 'reactstrap';
import styled from 'styled-components';

const Text = styled.p`
    margin-bottom: 0px;
`;

class Task extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        task: PropTypes.string.isRequired,
        onDelete: PropTypes.func.isRequired,
        deleting: PropTypes.arrayOf(PropTypes.string),
        toggleEdit: PropTypes.func.isRequired,
    }

    static defaultProps = {
        deleting: [],
    }

    onEditClick = (e) => {
        e.preventDefault();
        this.props.toggleEdit(this.props.id);
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
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center h100 m-r-1">
                        <Text>{task}</Text>
                    </div>
                    <div>
                        <Button
                            type="button"
                            onClick={this.onEditClick}
                            color="primary"
                            size="sm"
                            className="m-r-1"
                        >
                            Edit
                        </Button>
                        <Button
                            type="button"
                            onClick={this.onDeleteClick}
                            disabled={isDeleting}
                            color="danger"
                            size="sm"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </div>
                </div>
            </ListGroupItem>
        );
    }
}

export default Task;
