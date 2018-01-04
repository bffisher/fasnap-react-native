/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import store from './store';
import dataServ from './service/data';
import Tabs from './components/tabs';

import cn from './i18n/cn.lang';
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends Component<{}> {
  componentWillMount() {
    dataServ.init();

    store.dispatch({
      type: 'TEXT_LANG_CHANGE',
      langPackage: cn
    })
  }

  componentWillUnmount() {
    dataServ.destroy();
  }

  render() {
    return (
      <Provider store={store}>
        <Tabs></Tabs>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});
