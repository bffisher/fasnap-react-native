import React, { Component } from 'react';
import { View, Button, TextInput, Picker } from 'react-native';
import { connect } from 'react-redux'

import HeaderTitle from './headerTitle';
import Row from './row';
import Selector from './selector';

import dataServ from '../../service/data';

import { Util } from '../../util';

class MyInputText extends Component {
  constructor(props) {
    super(props);

    var { initText, onChangeText } = this.props;
    this.state = { text: initText };
    this.onChangeText = onChangeText;
    this.handleValueChange = this.handleValueChange.bind(this);
  };

  render() {
    var props = Object.assign({}, this.props);
    props.onChangeText = this.handleValueChange;
    props.value = this.state.text;
    return React.createElement(TextInput, props);
  };

  handleValueChange(text) {
    this.setState({ text })
    this.onChangeText(text);
  }
}

class Edit extends Component {

  constructor(props) {
    super(props);

    var { isNew, i18n } = this.props;

    this.platforms = dataServ.getCategory(i18n, 'platform');
    this.risks = dataServ.getCategory(i18n, 'risk');
    this.terms = dataServ.getCategory(i18n, 'term');

    if (isNew) {
      this.handleValueChange('name', '');
      this.handleValueChange('amount', '');
      this.handleValueChange('platform', this.platforms[0].value);
      this.handleValueChange('risk', this.risks[0].value);
      this.handleValueChange('term', this.terms[0].value);
    }
  };

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleDone: this.doneBtnClicked.bind(this) });
  };

  render() {
    var { isNew, assetItem, i18n } = this.props;
    console.log('render', assetItem);

    return (
      <View>
        <MyInputText onChangeText={(text) => this.handleValueChange('name', text)}
          initText={assetItem.name} placeholder={i18n.TITLE.NAME} />
        <MyInputText onChangeText={(text) => this.handleValueChange('amount', text)}
          initText={assetItem.amount === 0 ? '' : '' + assetItem.amount}
          placeholder={i18n.TITLE.AMOUNT} keyboardType='numeric' />
        <Selector onValueChange={(value) => this.handleValueChange('platform', value)}
          title={i18n.CATEGORY.NAME.PLATFORM} value={assetItem.platform} candidateItems={this.platforms} />
        <Selector onValueChange={(value) => this.handleValueChange('risk', value)}
          title={i18n.CATEGORY.NAME.RISK} value={assetItem.risk} candidateItems={this.risks} />
        <Selector onValueChange={(value) => this.handleValueChange('term', value)}
          title={i18n.CATEGORY.NAME.TERM} value={assetItem.term} candidateItems={this.terms} />
      </View>
    );
  };

  handleValueChange(name, value) {
    var { assetItem, changeSaveButtionStatus } = this.props;

    if (name === 'amount') {
      if (value === '') {
        value = 0;
      } else {
        value = parseInt(value, 10);
      }
    }

    assetItem[name] = value;

    if (assetItem.name && assetItem.amount) {
      changeSaveButtionStatus(true);
    } else {
      changeSaveButtionStatus(false);
    }

    console.log('handleValueChange', assetItem);
  };

  doneBtnClicked() {
    var { goBack } = this.props.navigation;
    var { assetItem } = this.props;


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
  return { isNew, assetItem, i18n: state.i18n };
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
      dispatch({ type: 'LIST_SNAPSHOT_ADD_ASSET_ITEM', assetItem })
    },
    modifyAssetItemToSnapshot: function (assetItem) {
      dispatch({ type: 'LIST_SNAPSHOT_MODIFY_ASSET_ITEM', assetItem })
    },
    changeSaveButtionStatus: function (saveButtionStatus) {
      dispatch({ type: 'LIST_ASSET_ITEM_EDIT_CHAGE_SAVE_BUTTION_STATUS', saveButtionStatus })
    }
  };
};

Edit = connect(mapStateToProps, mapDispatchToProps)(Edit);

var SaveButton = connect(function (state) {
  return { title: state.i18n.BUTTON.DONE, disabled: !state.list.assetItemEdit.saveButtionStatus };
})(Button);

Edit.navigationOptions = function ({ navigation }) {
  var { params = {} } = navigation.state;
  return {
    headerTitle: (<HeaderTitle title={i18n => i18n.TITLE.ASSET_ITEM_EDIT} />),
    headerRight: (<SaveButton onPress={params.handleDone ? params.handleDone : () => null} />)
  };
};

export default Edit;