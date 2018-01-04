import React, { Component } from 'react';
import { View, Button, ListView } from 'react-native';

import HeaderTitle from './headerTitle';
import { Text } from '../i18n';

class Edit extends Component {
  render() {
    return (
      <View>
        
      </View>
    );
  };
};

Edit.navigationOptions = function (navigation) {
  return {
    headerTitle : (<HeaderTitle>{'TITLE.SNAPSHOT_EDIT'}</HeaderTitle>)
  };
};

export default Edit;