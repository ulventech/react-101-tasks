import React, { Component } from 'react';
import axios from 'axios';
import { isEmpty, isArray } from 'lodash';
import {
  Form,
  Button,
  Input,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import TaskList from '../components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const BASE_API = 'https://us-central1-react-training-101.cloudfunctions.net/api/daniel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      tasks: [],
      fetching: false,
      submitting: false,
      deleting: [],
      isEditing: '',
    };
  }

  componentWillMount() {
    this.setState({ fetching: true });
    axios.get(`${BASE_API}/items`).then((resp) => {
      if (isArray(resp.data)) {
        this.setState({
          fetching: false,
          tasks: resp.data,
        });
      } else {
        this.setState({ fetching: false });  
      }
    }).catch((err) => {
      console.error(err);
      this.setState({ fetching: false });
      toast.error('Something whent wrong, please try again!');
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
      toast.success('Task sucessfully added!');
    }).catch((err) => {
      console.error(err);
      this.setState({ submitting: false });
      toast.error('Something whent wrong, please try again!');
    });
  }

  onDelete = (taskId) => {
    // Validate
    if (isEmpty(taskId)) {
      console.log('TaskId is required!');
      return;
    }

    this.setState({ deleting: [ ...this.state.deleting, taskId ] });
    axios.delete(`${BASE_API}/item/${taskId}`).then(() => {
      this.setState({
        tasks: this.state.tasks.filter(o => o.id !== taskId),
        deleting: this.state.deleting.filter(id => id !== taskId),
      });
    }).catch((err) => {
      console.error(err);
      this.setState({ deleting: this.state.deleting.filter(id => id !== taskId) });
      toast.error('Something whent wrong, please try again!');
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  toggleEdit = (taskId = '') => {
    this.setState({
      isEditing: taskId,
    });
  }

  render() {
    console.log(this.state.isEditing);
    return (
      <div className="container">
        <ToastContainer />
        <TaskList
          tasks={this.state.tasks}
          isLoading={this.state.fetching}
          onDelete={this.onDelete}
          deleting={this.state.deleting}
          toggleEdit={this.toggleEdit}
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
        <Modal
          isOpen={!isEmpty(this.state.isEditing)}
          toggle={this.toggleEdit}
        >
          <p>This is a modal!</p>
        </Modal>
      </div>
    );
  }
}

export default App;
