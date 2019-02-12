import React, { Component } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { Form, Button, Input, FormGroup } from 'reactstrap';
import TaskList from './TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';

const BASE_API = 'https://us-central1-react-training-101.cloudfunctions.net/api/daniel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      tasks: [],
      fetching: false,
      submitting: false,
    };
  }

  componentWillMount() {
    this.setState({ fetching: true });
    axios.get(`${BASE_API}/items`).then((resp) => {
      this.setState({
        fetching: false,
        tasks: resp.data,
      });
    }).catch((err) => {
      console.error(err);
      this.setState({ fetching: false });
    });
  }

  onCreateTask = (data = {}) => {
    // Validate
    const { task } = data;
    if (isEmpty(task)) {
      console.log('Task is required!');
      return;
    }

    this.setState({ submitting: true });
    axios.post(`${BASE_API}/item`, {
      task: task,
    })
    .then((resp) => {
      this.setState({
        task: '',
        tasks: [
          ...this.state.tasks,
          resp.data,
        ],
        submitting: false,
      });
    }).catch((err) => {
      console.error(err);
      this.setState({ submitting: false });
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="container">
        <TaskList
          tasks={this.state.tasks}
          isLoading={this.state.fetching}
        />
        <hr />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            this.onCreateTask(this.state);
          }}
        >
          <FormGroup>
            <Input
              name="task"
              value={this.state.task}
              onChange={this.onChange}
              type="text"
              placeholder="Buy milk"
              disabled={this.state.submitting}
            />
          </FormGroup>
          <Button
            type="submit"
            color="success"
            disabled={this.state.submitting}
          >
            {this.state.submitting ? 'Loading...' : 'Submit'}
          </Button>
        </Form>
      </div>
    );
  }
}

export default App;
