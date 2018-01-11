import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux'

import select from '../select';
import HeaderTitle from '../components/headerTitle';
import Picker from '../components/picker';

import { PAGES } from '../../../constants/actionTypes';
import dataServ from '../../../service/data';
import { Util } from '../../../util';

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

    return (
      <View>
        <MyInputText onChangeText={(text) => this.handleValueChange('name', text)}
          initText={assetItem.name} placeholder={i18n.TITLE.NAME} />
        <MyInputText onChangeText={(text) => this.handleValueChange('amount', text)}
          initText={assetItem.amount === 0 ? '' : '' + assetItem.amount}
          placeholder={i18n.TITLE.AMOUNT} keyboardType='numeric' />
        <Picker onValueChange={(value) => this.handleValueChange('platform', value)}
          title={i18n.CATEGORY.NAME.PLATFORM} value={assetItem.platform} candidateItems={this.platforms} />
        <Picker onValueChange={(value) => this.handleValueChange('risk', value)}
          title={i18n.CATEGORY.NAME.RISK} value={assetItem.risk} candidateItems={this.risks} />
        <Picker onValueChange={(value) => this.handleValueChange('term', value)}
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
  var { isNew, assetItem } = select(state).assetItemEdit;
  return { isNew, assetItem, i18n: state.i18n };
};

var mapDispatchToProps = function (dispatch) {
  var { SNAPSHOT_EDIT, ASSET_ITEM_EDIT } = PAGES.LIST;
  return {
    changeToNew: function () {
      dispatch({ type: ASSET_ITEM_EDIT.NEW })
    },
    changeToModify: function (assetItem) {
      dispatch({ type: ASSET_ITEM_EDIT.MODIFY, assetItem })
    },
    addAssetItemToSnapshot: function (assetItem) {
      dispatch({ type: SNAPSHOT_EDIT.ADD_ASSET_ITEM, assetItem })
    },
    modifyAssetItemToSnapshot: function (assetItem) {
      dispatch({ type: SNAPSHOT_EDIT.MODIFY_ASSET_ITEM, assetItem })
    },
    changeSaveButtionStatus: function (saveButtionStatus) {
      dispatch({ type: ASSET_ITEM_EDIT.CHANGE_SAVE_BUTTION_STATUS, saveButtionStatus })
    }
  };
};

Edit = connect(mapStateToProps, mapDispatchToProps)(Edit);

var SaveButton = connect(function (state) {
  return { title: state.i18n.BUTTON.DONE, disabled: !select(state).assetItemEdit.saveButtionStatus };
})(Button);

Edit.navigationOptions = function ({ navigation }) {
  var { params = {} } = navigation.state;
  return {
    headerTitle: (<HeaderTitle title={i18n => i18n.TITLE.ASSET_ITEM_EDIT} />),
    headerRight: (<SaveButton onPress={params.handleDone ? params.handleDone : () => null} />)
  };
};

export default Edit;