import React, { Component } from 'react';
import { View, Text, Button, ListView, TouchableOpacity, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'

import select from '../select';
import HeaderTitle from '../components/headerTitle';
import Row from '../components/row';

import { PAGES } from '../../../constants/actionTypes';
import { Util } from '../../../util';

class Edit extends Component {
  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSave: this.saveBtnClicked.bind(this) });
  };

  render() {
    var { isNew, snapshot, assetItemsDS, i18n } = this.props;

    return (
      <View>
        <DatePicker mode='date' date={snapshot.date} format='YYYY-MM-DD' onDateChange={(date) => this.props.dateChanged(date)} />
        <View style={{ marginVertical: 15, marginHorizontal: 15 }}>
          <Button onPress={this.addBtnClicked.bind(this)} title={i18n.BUTTON.ADD_ASSET_ITEM} />
          <Button disabled={!isNew || snapshot.assetItems.length > 0} onPress={this.importBtnClicked.bind(this)} title={i18n.BUTTON.IMPORT_ASSET_ITEMS} />
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

  addBtnClicked() {
    var { navigate } = this.props.navigation;
    var { assetItems } = this.props.snapshot;
    var no = assetItems.length === 0 ? 0 : (assetItems[assetItems.length - 1].no + 1);
    this.props.newAssetItem(no);
    navigate('AssetItemEdit');
  };

  importBtnClicked() {
    this.props.importAssetItemsOfLast();
  };

  saveBtnClicked() {
    var { goBack } = this.props.navigation;
    this.props.saveSnapshot(this.props.isNew, this.props.snapshot);
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
  var { snapshotEdit } = select(state);
  var { isNew, snapshot } = snapshotEdit;

  return {
    isNew,
    snapshot,
    assetItemsDS: listViewDataSource.cloneWithRows(snapshot.assetItems),
    i18n: state.i18n
  }
};

var mapDispatchToProps = function (dispatch) {
  var { SNAPSHOTS, SNAPSHOT_EDIT, ASSET_ITEM_EDIT } = PAGES.LIST;
  return {
    dateChanged: function (date) {
      dispatch({ type: SNAPSHOT_EDIT.CHANGE_DATE, date });
    },
    importAssetItemsOfLast: function () {
      dispatch({ type: SNAPSHOT_EDIT.IMPORT_ASSET_ITEMS_OF_LAST });
    },

    newAssetItem: function (no) {
      dispatch({ type: ASSET_ITEM_EDIT.NEW, no });
    },
    editAssetItem: function (assetItem) {
      dispatch({ type: ASSET_ITEM_EDIT.MODIFY, assetItem });
    },
    deleteAssetItem: function (no) {
      dispatch({ type: SNAPSHOT_EDIT.DELETE_ASSET_ITEM, no });
    },

    saveSnapshot: function (isNew, snapshot) {
      dispatch({ type: SNAPSHOT_EDIT.SAVE, isNew, snapshot });
    }
  };
};

Edit = connect(mapStateToProps, mapDispatchToProps)(Edit);

var SaveButton = connect(function (state) {
  var { snapshot } = select(state).snapshotEdit;
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