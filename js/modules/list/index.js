import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import TabBarLabel from '../tabBarLabel';
import ListScreen from './pages/list';
import SnapshotEditScreen from './pages/snapshotEdit';
import AssetItemEditScreen from './pages/assetItemEdit';

var Stack = StackNavigator({
  List: {
    screen: ListScreen
  },
  SnapshotEdit: {
    screen: SnapshotEditScreen
  },
  AssetItemEdit: {
    screen: AssetItemEditScreen
  }
});

Stack.navigationOptions = function (navigation) {
  return {
    tabBarLabel: (<TabBarLabel title={i18n => i18n.TITLE.LIST} />)
  };
};

export default Stack;