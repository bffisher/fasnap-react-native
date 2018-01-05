import React from 'react';
import { Text, Button } from 'react-native';
import { connect } from 'react-redux'

import translate from '../i18n/translate';

var i18nDecorate = function (component, propName = 'children') {
  var I18nComponent = function (props) {
    var content = translate(props.langPackage, props[propName]);
    if (propName === 'children') {
      return React.createElement(component, props, content);
    } else {
      props = Object.assign({}, props);
      props[propName] = content;
      return React.createElement(component, props, null);
    }
  };

  return connect(function (state) {
    return {
      langPackage: state.i18n
    }
  })(I18nComponent);
};

var I18nText = i18nDecorate(Text);

var I18nButton = i18nDecorate(Button, 'title');

export { I18nText, I18nButton };