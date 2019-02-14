import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TaskList from '../components/TaskList';
import CreateTaskForm from '../forms/CreateTask';
import EditTaskForm from '../forms/EditTask';
import backgroundPhoto from '../assets/background.jpg';

const BackgroundImage = styled.img`
  position: fixed;
  top: 0px;
  left: 0px;
  min-width: 100%;
  min-height: 100%;
`;

const Container = styled.div`
  position: relative;
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

class Home extends Component {
    render() {
        return (
            <div>
                <BackgroundImage src={backgroundPhoto} />
                <Container className="container">
                    <ToastContainer />
                    <Title>
                    Task Listly
                    </Title>
                    <TaskList />
                    <CreateTaskForm />
                    <EditTaskForm />
                </Container>
                <Container className="container">
                  <Link
                    to="/tc"
                  >
                    Terms and conditions
                  </Link>
                </Container>
            </div>
        );
    }
}

export default Home;
