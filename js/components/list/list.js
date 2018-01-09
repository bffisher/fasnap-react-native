import React, { Component } from 'react';
import { View, Button, ListView, Alert } from 'react-native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';
import { connect } from 'react-redux'

import HeaderTitle from './headerTitle';
import Row from './row';

import { Util } from '../../util';
import dataServ from '../../service/data';

var { SlideInMenu } = renderers;

class List extends Component {
  constructor(props) {
    super(props);

    this.addBtnClicked = this.addBtnClicked.bind(this);
    this.renderListRow = this.renderListRow.bind(this);
    this.deleteSelectedItem = this.deleteSelectedItem.bind(this);
  };

  componentWillMount() {
    this.props.iniDataSource();
  };

  render() {
    var { i18n } = this.props;
    return (
      <MenuProvider>
        <View>
          <View style={{ marginVertical: 15, marginHorizontal: 15 }}>
            <Button onPress={this.addBtnClicked} title={i18n.BUTTON.ADD_SNAPSHOT} />
          </View>
          <ListView
            enableEmptySections={true}
            dataSource={this.props.dataSource}
            renderRow={this.renderListRow}
          />
        </View>
        <Menu renderer={SlideInMenu}
          ref={menu => this.menu = menu}
          onSelect={value => this.onOptionSelect(value)}>
          <MenuTrigger />
          <MenuOptions>
            <MenuOption value='overview' text={i18n.BUTTON.OVERVIEW} />
            <MenuOption value='delete' text={i18n.BUTTON.DELETE} />
          </MenuOptions>
        </Menu>
      </MenuProvider>
    );
  };

  renderListRow(snapshot) {
    return (
      <Row
        title={snapshot.date}
        value={snapshot.amount}
        onPress={() => { this.itemPressed(snapshot) }}
        onLongPress={() => { this.itemLongPressed(snapshot) }}>
      </Row>
    );
  };

  onOptionSelect(value) {
    var { i18n } = this.props;

    switch (value) {
      case 'delete':
        Alert.alert(i18n.TEXT.DELETE_CONFIRM, '',
          [
            { text: i18n.BUTTON.CANCEL },
            { text: i18n.BUTTON.OK, onPress: this.deleteSelectedItem }
          ]);
        break;
    };
  }

  addBtnClicked() {
    var { navigate } = this.props.navigation;
    var date = Util.date2str(new Date());
    var lastOne = this.props.snapshots[0];
    if (lastOne && lastOne.date >= date) {
      let dateVal = Util.str2date(lastOne.date);
      dateVal.setDate(dateVal.getDate() + 1);
      date = Util.date2str(dateVal);
    }
    this.props.newSnapshot(date);
    navigate('SnapshotEdit');
  };

  itemPressed(snapshot) {
    var { navigate } = this.props.navigation;

    this.props.editSnapshot(snapshot);
    navigate('SnapshotEdit');
  };

  itemLongPressed(snapshot) {
    this.selectedItem = snapshot;
    this.menu.open();
  };

  deleteSelectedItem() {
    dataServ.deleteSnapshot(this.selectedItem.date);
    this.props.deleteSnapshot(this.selectedItem.date);
    this.selectedItem = null;
  };
};

var listViewDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
var mapStateToProps = function (state) {
  return {
    snapshots: state.list.snapshots,
    dataSource: listViewDataSource.cloneWithRows(state.list.snapshots),
    i18n: state.i18n
  }
};

var mapDispatchToProps = function (dispatch) {
  return {
    iniDataSource: function () {
      var snapshots = dataServ.getSnapshotList(null, null, true);
      dispatch({ type: 'LIST_SNAPSHOTS_INIT', snapshots })
    },
    newSnapshot: function (date) {
      dispatch({ type: 'LIST_SNAPSHOT_EDIT_NEW', date })
    },
    editSnapshot: function (snapshot) {
      dispatch({ type: 'LIST_SNAPSHOT_EDIT_MODIFY', snapshot })
    },
    deleteSnapshot: function (date) {
      dispatch({ type: 'LIST_SNAPSHOTS_DELETE', date })
    }
  };
};

List = connect(mapStateToProps, mapDispatchToProps)(List);
List.navigationOptions = function ({ navigation }) {
  return {
    headerTitle: (<HeaderTitle style={{ paddingLeft: 15 }} title={i18n => i18n.TITLE.LIST} />)
  };
};

export default List;