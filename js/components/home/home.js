import React from 'react';
import { View, Text } from 'react-native';

import Header from '../header';
import TabBarLabel from '../tabBarLabel';

export default class Home extends React.Component {
  static navigationOptions = function (navigation) {
    return {
      tabBarLabel: (<TabBarLabel title='TITLE.HOME' />)
    };
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Header title='TITLE.HOME'></Header>
      </View>
    );
  }
}