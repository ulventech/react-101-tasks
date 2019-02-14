import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
    Form,
    FormGroup,
    Label,
    InputGroup,
    Input,
    InputGroupAddon,
    Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import { createTask } from '../services/Tasks/actions';

const Card = styled.div`
  margin-top: 25px;
`;

class CreateTask extends Component {
    static propTypes = {
        createTask: PropTypes.func.isRequired,
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

    render() {
        return (
            <Card className="card">
                <div className="card-body">
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            this.props.createTask(this.state.task);
                            this.setState({ task: '' });
                        }}
                    >
                        <FormGroup>
                            <Label for="task-input">
                                What's on your mind?
                            </Label>
                            <InputGroup>
                                <Input
                                    id="task-input"
                                    name="task"
                                    value={this.state.task}
                                    onChange={this.onChange}
                                    type="text"
                                    placeholder="Buy milk"
                                    // disabled={this.state.submitting}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button
                                        type="submit"
                                        color="success"
                                        // disabled={this.state.submitting}
                                    >
                                        {this.state.submitting ? 'Loading...' : 'Submit'}
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                </div>
            </Card>
        );
    }
}

const mapDispatchToProps = {
    createTask,
};

export default connect(() => ({}), mapDispatchToProps)(CreateTask);
