import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux'

import { I18nButton } from '../i18n';
import HeaderTitle from './headerTitle';
import Row from './row';

import { Util } from '../../util';
import dataServ from '../../service/data';

class List extends Component {
  componentWillMount() {
    this.props.iniDataSource();
  };

  render() {
    return (
      <View>
        <View style={{ marginVertical: 15, marginHorizontal: 15 }}>
          <I18nButton onPress={this.addBtnClicked.bind(this)} title='BUTTON.ADD_SNAPSHOT' />
        </View>
        <ListView
          enableEmptySections={true}
          dataSource={this.props.dataSource}
          renderRow={this.renderListRow.bind(this)}
        />
      </View>
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
  };
};

var listViewDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
var mapStateToProps = function (state) {
  return {
    snapshots: state.list.snapshots,
    dataSource: listViewDataSource.cloneWithRows(state.list.snapshots)
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
    }
  };
};

List = connect(mapStateToProps, mapDispatchToProps)(List);
List.navigationOptions = function ({ navigation }) {
  return {
    headerTitle: (<HeaderTitle style={{ paddingLeft: 15 }}>{'TITLE.LIST'}</HeaderTitle>)
  };
};

export default List;