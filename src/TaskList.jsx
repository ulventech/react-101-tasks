import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskItem from './Task';

class TaskList extends Component {
    static propTypes = {
        tasks: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            task: PropTypes.string.isRequired,
        })),
    }

    static defaultProps = {
        tasks: [],
    }

    render() {
        const { tasks } = this.props;

        return (
            <div>
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task.task}
                    />
                ))}
            </div>
        );
    }
}

export default TaskList;
