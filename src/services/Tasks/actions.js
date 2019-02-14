import {
    TASKS_GET_TASKS_REQUEST,
    TASKS_CREATE_TASK_REQUEST,
} from '../types';

export const getTasks = () => ({
    type: TASKS_GET_TASKS_REQUEST,
});

export const createTask = (taskText) =>  ({
    type: TASKS_CREATE_TASK_REQUEST,
    payload: taskText,
});
