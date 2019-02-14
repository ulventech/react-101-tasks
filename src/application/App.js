import React, { Component } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import {
  Button,
  Input,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import store from '../services/store';
import TaskList from '../components/TaskList';
import CreateTaskForm from '../forms/CreateTask';
import backgroundPhoto from '../assets/background.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const BASE_API = 'https://us-central1-react-training-101.cloudfunctions.net/api/daniel';

const BackgroundImage = styled.img`
  position: fixed;
  top: 0px;
  left: 0px;
  min-width: 100%;
  min-height: 100%;
`;

const Container = styled.div`
  margin-bottom: 25px;
`;

const Title = styled.h1`
  position: relative;
  font-size: 3rem;
  color: #FFFFFF;
  text-align: center;
  margin-top: 25px;
  font-family: 'Libre Barcode 39 Text', cursive;
`;

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

  onCreateTask = (data = {}) => {
    // Validate
    const { task } = data;
    if (isEmpty(task)) {
      toast.error('Task text is required!');
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
      toast.error('TaskId is required!');
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
    if (this.state.tasks.length <= 0) {
      toast.error('Tasks needs to be loaded first');
      return;
    }

    const task = {
      ...this.state.tasks.filter(t => t.id === taskId)[0] || {},
    };
    if (!isEmpty(task)) {
      task.task = this.state.task;
      axios.put(`${BASE_API}/item/${taskId}`, task).then((resp) => {
        this.setState({
          task: '',
          tasks: this.state.tasks.map((t) => {
            if (t.id === taskId) {
              return {
                ...resp.data,
                id: taskId,
              };
            }
            return t;
          }),
          isEditing: '',
        });
      }).catch((err) => {
        console.error(err);
        toast.error('Something whent wrong, please try again!');
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  toggleEdit = (taskId = '') => {
    if (!isEmpty(taskId)) {
      const task = this.state.tasks.filter(t => t.id === taskId)[0];
      if (!isEmpty(task)) {
        this.setState({
          task: task.task,
        });
      }
    } else {
      this.setState({ task: '' });
    }
    this.setState({
      isEditing: taskId,
    });
  }

  render() {
    return (
      <Provider store={store()}>
        <BackgroundImage src={backgroundPhoto} />
        <Container className="container">
          <ToastContainer />
          <Title>
            Task Listly
          </Title>
          <TaskList />
          <CreateTaskForm />
          <Modal
            isOpen={!isEmpty(this.state.isEditing)}
            toggle={() => {
              this.toggleEdit('');
            }}
          >
            <ModalHeader toggle={() => { this.toggleEdit(''); }}>
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
                  this.onUpdate(this.state.isEditing);
                }}
              >
                Update task
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </Provider>
    );
  }
}

export default App;
