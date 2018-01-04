import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import TabBarLabel from '../tabBarLabel';
import ListScreen from './list';
import EditScreen from './edit';

var Stack = StackNavigator({
  List: {
    screen: ListScreen
  },

  Edit: {
    screen: EditScreen
  }
});

Stack.navigationOptions = function (navigation) {
  return {
    tabBarLabel: (<TabBarLabel title='TITLE.LIST' />)
  };
};

export default Stack;