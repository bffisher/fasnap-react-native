import { combineReducers } from 'redux';

import en from './en.lang';

export default function (state = en, action) {
  switch (action.type) {
    case 'TEXT_LANG_CHANGE':
      return action.langPackage;
    default:
      return state;
  }
};
