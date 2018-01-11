import { combineReducers } from 'redux';

import en from './en.lang';
import cn from './cn.lang';
import { I18N } from '../constants/actionTypes';

export default function (state = cn, action) {
  switch (action.type) {
    case I18N.LANG_EN:
      return en;
    case I18N.LANG_CN:
      return cn;
    default:
      return state;
  }
};
