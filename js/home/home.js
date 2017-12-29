import React from 'react';
import {View, Text } from 'react-native';
import Header from '../parts/header';

export default class Home extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Header text="Home"></Header>
      </View>
    );
  }
}