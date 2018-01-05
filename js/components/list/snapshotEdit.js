import React, { Component } from 'react';
import { View, Button, ListView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'

import { I18nButton } from '../i18n';
import HeaderTitle from './headerTitle';
import Row from './row';

import { Util } from '../../util';
import dataServ from '../../service/data';

class Edit extends Component {
  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSave: this.saveBtnClicked.bind(this) });
  };

  render() {
    var { isNew, snapshot, assetItemsDS } = this.props;

    return (
      <View>
        <DatePicker mode='date' date={snapshot.date} format='YYYY-MM-DD' onDateChange={this.dateChanged.bind(this)} />
        <View style={{ marginVertical: 15, marginHorizontal: 15 }}>
          <I18nButton onPress={this.addBtnClicked.bind(this)} title='BUTTON.ADD_ASSET_ITEM' />
        </View>
        <ListView
          enableEmptySections={true}
          dataSource={assetItemsDS}
          renderRow={this.renderListRow.bind(this)}
        />
      </View>
    );
  };

  renderListRow(assetItem) {
    return (
      <Row
        title={assetItem.name}
        value={assetItem.amount}
        onPress={() => { this.itemPressed(assetItem) }}
        onLongPress={() => { this.itemLongPressed(assetItem) }}>
      </Row>
    );
  };

  dateChanged(date) {
    var existSnapshot = dataServ.getSnapshot(date);
    if (existSnapshot) {
      this.props.changeToModify(existSnapshot);
    } else {
      this.props.changeToNew(date);
    }
  };

  addBtnClicked() {
    var { navigate } = this.props.navigation;
    this.props.newAssetItem();
    navigate('AssetItemEdit');
  };

  saveBtnClicked() {
    var { goBack } = this.props.navigation;

    dataServ.saveSnapshot(this.props.snapshot);
    if (this.props.isNew) {
      this.props.addSnapshotToList(this.props.snapshot);
    } else {
      this.props.modifySnapshotToList(this.props.snapshot);
    }
    goBack();
  };

  itemPressed(assetItem) {
    var { navigate } = this.props.navigation;
    this.props.editAssetItem(assetItem);
    navigate('AssetItemEdit');
  };

  itemLongPressed(assetItem) {
  };
};

var listViewDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
var mapStateToProps = function (state) {
  var { isNew, snapshot } = state.list.snapshotEdit;
  return {
    isNew,
    snapshot,
    assetItemsDS: listViewDataSource.cloneWithRows(snapshot.assetItems)
  }
};

var mapDispatchToProps = function (dispatch) {
  return {
    changeToNew: function (date) {
      dispatch({ type: 'LIST_SNAPSHOT_EDIT_NEW', date })
    },
    changeToModify: function (snapshot) {
      dispatch({ type: 'LIST_SNAPSHOT_EDIT_MODIFY', snapshot })
    },
    newAssetItem: function () {
      dispatch({ type: 'LIST_ASSET_ITEM_EDIT_NEW'})
    },
    editAssetItem: function (assetItem) {
      dispatch({ type: 'LIST_ASSET_ITEM_EDIT_MODIFY', assetItem })
    },
    addSnapshotToList: function (snapshot) {
      dispatch({ type: 'LIST_SNAPSHOTS_ADD', snapshot })
    },
    modifySnapshotToList: function (snapshot) {
      dispatch({ type: 'LIST_SNAPSHOTS_MODIFY', snapshot })
    }
  };
};

Edit = connect(mapStateToProps, mapDispatchToProps)(Edit);
Edit.navigationOptions = function ({ navigation }) {
  var { params = {} } = navigation.state;
  return {
    headerTitle: (<HeaderTitle>{'TITLE.SNAPSHOT_EDIT'}</HeaderTitle>),
    headerRight: (<I18nButton onPress={params.handleSave ? params.handleSave : () => null} title='BUTTON.SAVE' />)
  };
};

export default Edit;