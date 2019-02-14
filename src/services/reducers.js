import { reducer as formReducer } from 'redux-form';
import Tasks from './Tasks/reducers';

export default {
    form: formReducer,
    Tasks,
};
