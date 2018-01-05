import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux'

import { I18nButton } from '../i18n';
import HeaderTitle from './headerTitle';
import Row from './row';

import { Util } from '../../util';

class Edit extends Component {
  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleDone: this.doneBtnClicked.bind(this) });
  };

  render() {
    var { isNew, assetItem = {} } = this.props;

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
      }}>
        <Text>{'aaaaaa'}</Text>
        <Picker
          selectedValue={null}
          onValueChange={(itemValue, itemIndex) => null}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  };



  doneBtnClicked() {
    var { goBack } = this.props.navigation;
    var { assetItem } = this.props;
    if (!assetItem) {
      assetItem = {};
      assetItem.name = 'xxx';
      assetItem.amount = 0;
    }
    if (this.props.isNew) {
      this.props.addAssetItemToSnapshot(assetItem);
    } else {
      this.props.modifyAssetItemToSnapshot(assetItem);
    }
    goBack();
  };
};

var mapStateToProps = function (state) {
  var { isNew, assetItem } = state.list.assetItemEdit;
  return { isNew, assetItem };
};

var mapDispatchToProps = function (dispatch) {
  return {
    changeToNew: function () {
      dispatch({ type: 'LIST_ASSET_ITEM_EDIT_NEW' })
    },
    changeToModify: function (assetItem) {
      dispatch({ type: 'LIST_ASSET_ITEM_EDIT_MODIFY', assetItem })
    },
    addAssetItemToSnapshot: function (assetItem) {
      dispatch({ type: 'LIST_SNAPSHOT_ASSET_ITEM_ADD', assetItem })
    },
    modifyAssetItemToSnapshot: function (assetItem) {
      dispatch({ type: 'LIST_SNAPSHOT_ASSET_ITEM_MODIFY', assetItem })
    }
  };
};

Edit = connect(mapStateToProps, mapDispatchToProps)(Edit);
Edit.navigationOptions = function ({ navigation }) {
  var { params = {} } = navigation.state;
  return {
    headerTitle: (<HeaderTitle>{'TITLE.ASSET_ITEM_EDIT'}</HeaderTitle>),
    headerRight: (<I18nButton onPress={params.handleDone ? params.handleDone : () => null} title='BUTTON.DONE' />)
  };
};

export default Edit;