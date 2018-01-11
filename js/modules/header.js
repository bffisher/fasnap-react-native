import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    height: 48,
    backgroundColor: '#d74047',
    alignItems: 'center'
  },
  title: {
    color: '#ffffff',
    fontSize: 18
  }
});

export default connect(function (state) {
  return { i18n: state.i18n };
})((props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title(props.i18n)}</Text>
    </View>
  );
});