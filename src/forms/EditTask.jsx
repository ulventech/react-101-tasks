import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Input,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { isEmpty } from 'lodash';
import toast from 'react-toastify';
import { connect } from 'react-redux';
import { editTask, toggleEditModal } from '../services/Tasks/actions';

class EditTask extends Component {
    static propTypes = {
        Tasks: PropTypes.shape({
            isEditingTask: PropTypes.string,
        }).isRequired,
        editTask: PropTypes.func.isRequired,
        toggleEditModal: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            task: '',
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onUpdate = (taskId) => {
        // Validate
        if (isEmpty(this.state.task)) {
          toast.error('Task text is required!');
          return;
        }
        if (isEmpty(taskId)) {
          toast.error('TaskId is required!');
          return;
        }
    
        // Get full task from state
        if (this.props.Tasks.tasks.length <= 0) {
          toast.error('Tasks needs to be loaded first');
          return;
        }
    
        const task = {
          ...this.props.Tasks.tasks.filter(t => t.id === taskId)[0] || {},
        };

        if (!isEmpty(task)) {
          task.task = this.state.task;
          this.props.editTask(taskId, task);
        }
    }

    render() {
        const { isEditingTask } = this.props.Tasks;

        return (
            <Modal
                isOpen={!isEmpty(isEditingTask)}
                toggle={() => {
                    this.props.toggleEditModal('');
                }}
            >
                <ModalHeader toggle={() => { this.props.toggleEditModal(''); }}>
                    Edit task
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input
                            name="task"
                            value={this.state.task}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color="success"
                        onClick={(e) => {
                            e.preventDefault();
                            this.onUpdate(isEditingTask);
                        }}
                    >
                        Update task
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    Tasks: state.Tasks,
});

const mapDispatchToProps = {
    editTask,
    toggleEditModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
