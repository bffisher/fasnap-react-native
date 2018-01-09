import React from 'react';

import { Text } from 'react-native';
import { connect } from 'react-redux';

export default connect(function (state) {
  return { i18n: state.i18n };
})((props) => {
  var style = Object.assign({ fontSize: 18 }, props.style);
  return (
    <Text style={style}>{props.title(props.i18n)}</Text>
  );
});