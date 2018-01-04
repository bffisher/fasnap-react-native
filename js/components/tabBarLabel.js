import React from 'react';
import { View, StyleSheet } from 'react-native';
import { I18nText } from './i18n';

export default function (props) {
  return (
    <I18nText style={{ color: '#ffffff', fontSize: 17 }}>{props.title}</I18nText>
  )
};