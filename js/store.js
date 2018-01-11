import { createStore, combineReducers, applyMiddleware } from 'redux';
import { fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga'

import i18nReducer from './i18n/reducer';
import pagesReducer from './modules/reducer';
import pagesSage from './modules/saga';

const reducers = combineReducers({ i18n: i18nReducer, pages: pagesReducer });

const sagaMiddleware = createSagaMiddleware();

const rootSaga = function* () {
  yield fork(pagesSage); 
};

const stroe = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default stroe;