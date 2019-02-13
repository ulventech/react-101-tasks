import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { getTasks } from '../services/Tasks/actions';
import TaskItem from './Task';

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
        console.log(this.props);

        return (
            <div>
                {getting ? (
                    <h3 className="text-center">
                        Loading...
                    </h3>
                ) : (
                    <ListGroup>
                        {tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                id={task.id}
                                task={task.task}
                            />
                        ))}
                    </ListGroup>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    Tasks: state.Tasks,
});

const mapDispatchToProps = {
    getTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
