import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    color:'#ffffff',
    fontSize: 18
  }
});

export default (props) => (
  <View style={styles.container}>
    <Text style={styles.title}>{props.text}</Text>
  </View>
);