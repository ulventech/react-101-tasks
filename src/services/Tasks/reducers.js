import {
    TASKS_GET_TASKS_REQUEST,
    TASKS_GET_TASKS_SUCCESS,
    TASKS_GET_TASKS_FAILURE,
    TASKS_CREATE_TASK_REQUEST,
    TASKS_CREATE_TASK_SUCCESS,
    TASKS_CREATE_TASK_FAILURE,
} from '../types';

const DEFAULT_STATE = {
    tasks: [],
    isLoading: {
        getting: false,
        updating: false,
        creating: false,
    },
};

export default (state = DEFAULT_STATE, action = {}) => {
    switch (action.type) {
        case TASKS_GET_TASKS_REQUEST: return {
            ...state,
            tasks: [],
            isLoading: {
                ...state.isLoading,
                getting: true,
            },
        };
        case TASKS_GET_TASKS_SUCCESS: return {
            ...state,
            tasks: action.payload,
            isLoading: {
                ...state.isLoading,
                getting: false,
            },
        };
        case TASKS_GET_TASKS_FAILURE: return {
            ...state,
            isLoading: {
                ...state.isLoading,
                getting: false,
            },
        };
        case TASKS_CREATE_TASK_REQUEST: return {
            ...state,
            isLoading: {
                ...state.isLoading,
                creating: true,
            },
        };
        case TASKS_CREATE_TASK_SUCCESS: return {
            ...state,
            tasks: [
                ...state.tasks,
                action.payload,
            ],
            isLoading: {
                ...state.isLoading,
                creating: false,
            },
        };
        case TASKS_CREATE_TASK_FAILURE: return {
            ...state,
            isLoading: {
                ...state.isLoading,
                creating: false,
            },
        };
        default: return state;
    }
}
