import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../parts/header';

export default class Setup extends Component {
  static navigationOptions = {
    tabBarLabel: 'Setup',
  };
  render() {
    return (
      <View><Header text="Setup"></Header></View>
    );
  }
}