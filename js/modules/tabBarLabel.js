import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

export default connect(function (state) {
  return { i18n: state.i18n };
})((props) => {
  return (
    <Text style={{ color: '#ffffff', fontSize: 17 }}>{props.title(props.i18n)}</Text>
  );
});