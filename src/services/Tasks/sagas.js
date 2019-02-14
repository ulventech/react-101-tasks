import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
    TASKS_GET_TASKS_REQUEST,
    TASKS_GET_TASKS_SUCCESS,
    TASKS_GET_TASKS_FAILURE,
    TASKS_CREATE_TASK_REQUEST,
    TASKS_CREATE_TASK_SUCCESS,
    TASKS_CREATE_TASK_FAILURE,
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

export default function* () {
    yield takeLatest(TASKS_GET_TASKS_REQUEST, getTasks);
    yield takeEvery(TASKS_CREATE_TASK_REQUEST, createTask);
};
