import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import reducers from './reducers';
import sagas from './sagas';

const configureSaga = sagas => function* configureSagaGenerator() {
    yield all(sagas.map(saga => fork(saga)));
};

let middleware = [];

// Create and add Redux Saga middleware
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

const enhancer = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default () => {
    const store = createStore(
        combineReducers(reducers),
        enhancer,
    );

    // Apply sagas
    sagaMiddleware.run(configureSaga(sagas));

    return store;
};
