import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
    TASKS_GET_TASKS_REQUEST,
    TASKS_GET_TASKS_SUCCESS,
} from '../types';

function* getTasks() {
    const response = yield call(axios.get, 'https://us-central1-react-training-101.cloudfunctions.net/api/daniel/items');
    console.log(response);
    yield put({
        type: TASKS_GET_TASKS_SUCCESS,
        payload: response.data,
    });
}

export default function* () {
    yield takeLatest(TASKS_GET_TASKS_REQUEST, getTasks);
};
