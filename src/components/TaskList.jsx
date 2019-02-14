import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ListGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { getTasks, deleteTask, toggleEditModal } from '../services/Tasks/actions';
import TaskItem from './Task';

const TaskListContainer = styled.div`
    margin-top: 25px;
`;

const LoadingText = styled.h3`
    position: relative;
    color: #FFFFFF;
`;

class TaskList extends Component {
    static propTypes = {
        Tasks: PropTypes.shape({
            tasks: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string.isRequired,
                task: PropTypes.string.isRequired,
            })),
            isLoading: PropTypes.shape({
                getting: PropTypes.bool.isRequired,
            }).isRequired,
        }).isRequired,
        getTasks: PropTypes.func.isRequired,
        deleteTask: PropTypes.func.isRequired,
        toggleEditModal: PropTypes.func.isRequired,
    }
    
    componentWillMount() {
        this.props.getTasks();
    }

    render() {
        const {
            tasks,
            isLoading: {
                getting,
            },
        } = this.props.Tasks;

        return (
            <TaskListContainer>
                {getting ? (
                    <LoadingText className="text-center">
                        Loading...
                    </LoadingText>
                ) : (
                    <ListGroup>
                        {tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                id={task.id}
                                task={task.task}
                                deleteTask={this.props.deleteTask}
                                toggleEdit={this.props.toggleEditModal}
                            />
                        ))}
                    </ListGroup>
                )}
            </TaskListContainer>
        );
    }
}

const mapStateToProps = state => ({
    Tasks: state.Tasks,
});

const mapDispatchToProps = {
    getTasks,
    deleteTask,
    toggleEditModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
