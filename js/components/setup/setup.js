import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '../header';
import TabBarLabel from '../tabBarLabel';

export default class Setup extends Component {
  static navigationOptions = function (navigation) {
    return {
      tabBarLabel: (<TabBarLabel title='TITLE.SETTINGS' />)
    };
  };

  render() {
    return (
      <View><Header title='TITLE.SETTINGS'></Header></View>
    );
  }
}