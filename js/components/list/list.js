import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux'

import { I18nText, I18nButton } from '../i18n';
import HeaderTitle from './headerTitle';
import Row from './row';

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
        snapshot={snapshot}
        onPress={() => { this.itemPressed(snapshot) }}
        onLongPress={() => { this.itemLongPressed(snapshot) }}>
      </Row>
    );
  };

  addBtnClicked() {
    var { navigate } = this.props.navigation;
    navigate('Edit');
  };

  itemPressed(snapshot) {
  };

  itemLongPressed(snapshot) {
  };
};

var listViewDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
var mapStateToProps = function (state) {
  return {
    dataSource: listViewDataSource.cloneWithRows(state.list.snapshots)
  }
};

var mapDispatchToProps = function (dispatch) {
  return {
    iniDataSource: function () {
      var snapshots = dataServ.getSnapshotList(null, null, true);
      dispatch({ type: 'LIST_INIT_SNAPSHOTS', snapshots })
    }
  };
};

List = connect(mapStateToProps, mapDispatchToProps)(List);
List.navigationOptions = function (navigation) {
  return {
    headerTitle: (<HeaderTitle style={{ paddingLeft: 15 }}>{'TITLE.LIST'}</HeaderTitle>)
  };
};

export default List;