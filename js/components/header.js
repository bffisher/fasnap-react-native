import React from 'react';
import { View, StyleSheet } from 'react-native';
import {I18nText} from './i18n';

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

export default function (props) {
  return (
    <View style={styles.container}>
      <I18nText style={styles.title}>{props.title}</I18nText>
    </View>
  )
};