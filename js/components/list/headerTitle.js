import React from 'react';

import { I18nText } from '../i18n';

export default function (props) {
  props = Object.assign({}, props);
  props.style = Object.assign({
    fontSize: 18
  }, props.style);

  return React.createElement(I18nText, props, props.children);
};