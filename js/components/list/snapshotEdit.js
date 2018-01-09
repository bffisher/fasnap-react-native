import React, { Component } from 'react';
import { View, Text, Button, ListView, TouchableOpacity, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'

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
    var { isNew, snapshot, assetItemsDS, i18n } = this.props;

    return (
      <View>
        <DatePicker mode='date' date={snapshot.date} format='YYYY-MM-DD' onDateChange={this.dateChanged.bind(this)} />
        <View style={{ marginVertical: 15, marginHorizontal: 15 }}>
          <Button onPress={this.addBtnClicked.bind(this)} title={i18n.BUTTON.ADD_ASSET_ITEM} />
          <Button disabled={snapshot.assetItems.length > 0} onPress={this.importBtnClicked.bind(this)} title={i18n.BUTTON.IMPORT_ASSET_ITEMS} />
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
    var { i18n } = this.props;
    return (
      <TouchableOpacity onPress={() => this.itemPressed(assetItem)} >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20
        }}>
          <Text>{assetItem.name}</Text>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text>{assetItem.amount}</Text>
            <TouchableOpacity onPress={() => this.deleteBtnClicked(assetItem)} >
              <Text style={{ paddingLeft: 5, color: 'blue' }}>{i18n.BUTTON.DELETE}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
    var { assetItems } = this.props.snapshot;
    var no = assetItems.length === 0 ? 0 : (assetItems[assetItems.length - 1].no + 1);
    this.props.newAssetItem(no);
    navigate('AssetItemEdit');
  };

  importBtnClicked() {
    var snapshot = this.props.snapshots[0];
    this.props.importAssetItems(snapshot.assetItems);
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

  deleteBtnClicked(assetItem) {
    var { i18n } = this.props;

    Alert.alert(i18n.TEXT.DELETE_CONFIRM, '',
      [
        { text: i18n.BUTTON.CANCEL },
        { text: i18n.BUTTON.OK, onPress: () => this.deleteSelectedItem(assetItem) }
      ]);
  };

  deleteSelectedItem(assetItem) {
    this.props.deleteAssetItem(assetItem.no);
  };
};

var listViewDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
var mapStateToProps = function (state) {
  var { isNew, snapshot } = state.list.snapshotEdit;
  var { snapshots } = state.list;
  return {
    isNew,
    snapshot,
    assetItemsDS: listViewDataSource.cloneWithRows(snapshot.assetItems),
    snapshots,
    i18n: state.i18n
  }
};

var mapDispatchToProps = function (dispatch) {
  return {
    changeToNew: function (date) {
      dispatch({ type: 'LIST_SNAPSHOT_EDIT_NEW', date });
    },
    changeToModify: function (snapshot) {
      dispatch({ type: 'LIST_SNAPSHOT_EDIT_MODIFY', snapshot });
    },
    importAssetItems: function (assetItems) {
      dispatch({ type: 'LIST_SNAPSHOT_IMPORT_ASSET_ITEMS', assetItems });
    },

    newAssetItem: function (no) {
      dispatch({ type: 'LIST_ASSET_ITEM_EDIT_NEW', no });
    },
    editAssetItem: function (assetItem) {
      dispatch({ type: 'LIST_ASSET_ITEM_EDIT_MODIFY', assetItem });
    },
    deleteAssetItem: function (no) {
      dispatch({ type: 'LIST_SNAPSHOT_DELETE_ASSET_ITEM', no });
    },

    addSnapshotToList: function (snapshot) {
      dispatch({ type: 'LIST_SNAPSHOTS_ADD', snapshot });
    },
    modifySnapshotToList: function (snapshot) {
      dispatch({ type: 'LIST_SNAPSHOTS_MODIFY', snapshot });
    }
  };
};

Edit = connect(mapStateToProps, mapDispatchToProps)(Edit);

var SaveButton = connect(function (state) {
  var { snapshot } = state.list.snapshotEdit;
  return { title: state.i18n.BUTTON.DONE, disabled: snapshot.assetItems.length === 0 };
})(Button);

Edit.navigationOptions = function ({ navigation }) {
  var { params = {} } = navigation.state;
  return {
    headerTitle: (<HeaderTitle title={i18n => i18n.TITLE.SNAPSHOT_EDIT} />),
    headerRight: (<SaveButton onPress={params.handleSave ? params.handleSave : () => null} />)
  };
};

export default Edit;