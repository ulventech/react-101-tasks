import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import { isEmpty } from 'lodash';
import toast from 'react-toastify';
import { connect } from 'react-redux';
import { editTask, toggleEditModal } from '../services/Tasks/actions';
import TaskForm from './Task';

class EditTask extends Component {
    static propTypes = {
        Tasks: PropTypes.shape({
            isEditingTask: PropTypes.string,
        }).isRequired,
        editTask: PropTypes.func.isRequired,
        toggleEditModal: PropTypes.func.isRequired,
    }

    onUpdate = (taskId, values) => {
        // Validate
        if (isEmpty(values.task)) {
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
          task.task = values.task;
          this.props.editTask(taskId, task);
        }
    }

    getTask = (taskId) => this.props.Tasks.tasks.filter(t => t.id === taskId)[0] || {};

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
                    <TaskForm
                        onSubmit={(values) => {
                            this.onUpdate(isEditingTask, values);
                        }}
                        initialValues={this.getTask(isEditingTask)}
                    />
                </ModalBody>
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
