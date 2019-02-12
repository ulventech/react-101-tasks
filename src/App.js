import React, { Component } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';
import TaskList from './TaskList';

const BASE_API = 'https://us-central1-react-training-101.cloudfunctions.net/api/daniel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      tasks: [],
    };
  }

  componentWillMount() {
    axios.get(`${BASE_API}/items`).then((resp) => {
      this.setState({
        tasks: resp.data,
      });
      console.log(resp.data);
    }).catch((err) => {
      console.error(err);
    });
  }

  onCreateTask = (data = {}) => {
    // Validate
    const { task } = data;
    if (isEmpty(task)) {
      console.log('Task is required!');
      return;
    }

    axios.post(`${BASE_API}/item`, data)
    .then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.error(err);
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <TaskList tasks={this.state.tasks} />
        <br /><br />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.onCreateTask(this.state);
          }}
        >
          <input
            name="task"
            value={this.state.task}
            onChange={this.onChange}
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default App;
