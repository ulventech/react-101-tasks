import {
    TASKS_GET_TASKS_REQUEST,
    TASKS_GET_TASKS_SUCCESS,
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
        };
        case TASKS_GET_TASKS_SUCCESS: return {
            ...state,
            tasks: action.payload,
        };
        default: return state;
    }
}
