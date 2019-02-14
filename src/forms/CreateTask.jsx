import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTask } from '../services/Tasks/actions';
import TaskForm from './Task';

const Card = styled.div`
  margin-top: 25px;
`;

class CreateTask extends Component {
    static propTypes = {
        createTask: PropTypes.func.isRequired,
    }

    render() {
        return (
            <Card className="card">
                <div className="card-body">
                    <TaskForm
                        onSubmit={({ task }) => {
                            this.props.createTask(task);
                        }}
                    />
                </div>
            </Card>
        );
    }
}

const mapDispatchToProps = {
    createTask,
};

export default connect(() => ({}), mapDispatchToProps)(CreateTask);
