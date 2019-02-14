import {
    TASKS_GET_TASKS_REQUEST,
    TASKS_CREATE_TASK_REQUEST,
    TASKS_DELETE_TASK_REQUEST,
    TASKS_EDIT_TASK_REQUEST,
    TASKS_TOGGLE_EDIT_MODAL,
} from '../types';

export const getTasks = () => ({
    type: TASKS_GET_TASKS_REQUEST,
});

export const createTask = (taskText) =>  ({
    type: TASKS_CREATE_TASK_REQUEST,
    payload: taskText,
});

export const deleteTask = (taskId) => ({
    type: TASKS_DELETE_TASK_REQUEST,
    payload: taskId,
});

export const editTask = (taskId, data = {}) => ({
    type: TASKS_EDIT_TASK_REQUEST,
    payload: {
        taskId,
        data,
    },
});

export const toggleEditModal = (taskId) => ({
    type: TASKS_TOGGLE_EDIT_MODAL,
    payload: taskId,
});
