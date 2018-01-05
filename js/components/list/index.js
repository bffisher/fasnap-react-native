import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import TabBarLabel from '../tabBarLabel';
import ListScreen from './list';
import SnapshotEditScreen from './snapshotEdit';
import AssetItemEditScreen from './assetItemEdit';

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
    tabBarLabel: (<TabBarLabel title='TITLE.LIST' />)
  };
};

export default Stack;