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
    TASKS_TOGGLE_EDIT_MODAL,
} from '../types';

const DEFAULT_STATE = {
    tasks: [],
    isLoading: {
        getting: false,
        updating: false,
        creating: false,
    },
    isEditingTask: '',
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
        case TASKS_DELETE_TASK_REQUEST: return {
            ...state,
        };
        case TASKS_DELETE_TASK_SUCCESS: return {
            ...state,
            tasks: state.tasks.filter(t => t.id !== action.payload),
        };
        case TASKS_DELETE_TASK_FAILURE: return {
            ...state,
        };
        case TASKS_TOGGLE_EDIT_MODAL: return {
            ...state,
            isEditingTask: action.payload,
        };
        case TASKS_EDIT_TASK_REQUEST: return {
            ...state,
            isLoading: {
                ...state.isLoading,
                updating: true,
            },
        };
        case TASKS_EDIT_TASK_SUCCESS: return {
            ...state,
            tasks: state.tasks.map((task) => {
                if (task.id === action.payload.id) {
                    return action.payload;
                }

                return task;
            }),
            isLoading: {
                ...state.isLoading,
                updating: false,
            },
            isEditingTask: '',
        };
        case TASKS_EDIT_TASK_FAILURE: return {
            ...state,
            isLoading: {
                ...state.isLoading,
                updating: false,
            },
        };
        default: return state;
    }
}
