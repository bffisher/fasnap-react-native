import { fork } from 'redux-saga/effects';
import listSage from './list/saga';

export default function* pagesSaga() {
  yield fork(listSage);
};