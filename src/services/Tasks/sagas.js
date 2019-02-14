import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
    TASKS_GET_TASKS_REQUEST,
    TASKS_GET_TASKS_SUCCESS,
    TASKS_GET_TASKS_FAILURE,
    TASKS_CREATE_TASK_REQUEST,
    TASKS_CREATE_TASK_SUCCESS,
    TASKS_CREATE_TASK_FAILURE,
    TASKS_DELETE_TASK_REQUEST,
    TASKS_DELETE_TASK_SUCCESS,
    TASKS_DELETE_TASK_FAILURE,
    TASKS_EDIT_TASK_REQUEST,
    TASKS_EDIT_TASK_SUCCESS,
    TASKS_EDIT_TASK_FAILURE,
} from '../types';

function* getTasks() {
    try {
        const response = yield call(axios.get, 'https://us-central1-react-training-101.cloudfunctions.net/api/daniel/items');
        yield put({
            type: TASKS_GET_TASKS_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        yield put({ type: TASKS_GET_TASKS_FAILURE });
    }
}

function* createTask(action) {
    try {
        const response = yield call(
            axios.post,
            'https://us-central1-react-training-101.cloudfunctions.net/api/daniel/item',
            { task: action.payload },
        );
        yield put({
            type: TASKS_CREATE_TASK_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: TASKS_CREATE_TASK_FAILURE,
        });
    }
}

function* deleteTask(action) {
    try {
        yield call(
            axios.delete,
            `https://us-central1-react-training-101.cloudfunctions.net/api/daniel/item/${action.payload}`,
        );
        yield put({
            type: TASKS_DELETE_TASK_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: TASKS_DELETE_TASK_FAILURE,
        });
    }
}

function* editTask(action) {
    try {
        const response = yield call(
            axios.put,
            `https://us-central1-react-training-101.cloudfunctions.net/api/daniel/item/${action.payload.taskId}`,
            action.payload.data,
        );
        yield put({
            type: TASKS_EDIT_TASK_SUCCESS,
            payload: {
                ...response.data,
                id: action.payload.taskId,
            },
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: TASKS_EDIT_TASK_FAILURE,
        });
    }
}

export default function* () {
    yield takeLatest(TASKS_GET_TASKS_REQUEST, getTasks);
    yield takeEvery(TASKS_CREATE_TASK_REQUEST, createTask);
    yield takeEvery(TASKS_DELETE_TASK_REQUEST, deleteTask);
    yield takeEvery(TASKS_EDIT_TASK_REQUEST, editTask);
};
