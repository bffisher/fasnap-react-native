import React from 'react';
import { View, Text } from 'react-native';

import Header from '../header';
import TabBarLabel from '../tabBarLabel';

export default class Home extends React.Component {
  static navigationOptions = function (navigation) {
    return {
      tabBarLabel: (<TabBarLabel title={i18n=>i18n.TITLE.HOME} />)
    };
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Header title={i18n=>i18n.TITLE.HOME}></Header>
      </View>
    );
  }
}