import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Header from '../parts/header';

export default class List extends Component {
  static navigationOptions = {
    tabBarLabel: 'List',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Header text="List"></Header>
        <Button onPress={() => navigate('Home')} title="..." />
      </View>
    );
  }
}