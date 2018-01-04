import { createStore, combineReducers } from 'redux';

import i18n from './i18n/reducer';
import list from './components/list/reducer';

var store = createStore(combineReducers({ i18n, list }));

export default store;