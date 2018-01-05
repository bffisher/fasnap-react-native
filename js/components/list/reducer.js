import { combineReducers } from 'redux';

import { Util } from '../../util';

var snapshots = function (state = [], action) {
  switch (action.type) {
    case 'LIST_SNAPSHOTS_INIT':
      return action.snapshots;
    case 'LIST_SNAPSHOTS_ADD':
      let result = [], len = state.length, inserted = false;
      for (let i = 0; i < len; i++) {
        if (!inserted && action.snapshot.date >= state[i].date) {
          result.push(action.snapshot);
          inserted = true;
        }
        result.push(state[i]);
      }
      return result;
    case 'LIST_SNAPSHOTS_DELETE':
      return state.filter(snapshot => (snapshot.date !== action.date));
    case 'LIST_SNAPSHOTS_MODIFY':
      return state.map(snapshot => (snapshot.date === action.snapshot.date) ? action.snapshot : snapshot);
    default:
      return state;
  }
};

var snapshotEdit = function (state = {}, action) {
  switch (action.type) {
    case 'LIST_SNAPSHOT_EDIT_NEW':
      return {
        isNew: true,
        snapshot: {
          date: action.date ? action.date : '',
          assetItems: []
        }
      }
      break;
    case 'LIST_SNAPSHOT_EDIT_MODIFY':
      return {
        isNew: false,
        snapshot: action.snapshot
      }
      break;
    case 'LIST_SNAPSHOT_ASSET_ITEM_ADD':
      state.snapshot.assetItems = [...state.snapshot.assetItems, action.assetItem];
      return {
        isNew: state.isNew,
        snapshot: state.snapshot
      }
      break;
    case 'LIST_SNAPSHOT_ASSET_ITEM_MODIFY':
      state.snapshot.assetItems = state.snapshot.assetItems.map(item => (item.no === action.assetItem.no) ? action.assetItem : item);
      return {
        isNew: state.isNew,
        snapshot: state.snapshot
      }
      break;
    default:
      return state;
  }
};

var assetItemEdit = function (state = {}, action) {
  switch (action.type) {
    case 'LIST_ASSET_ITEM_EDIT_NEW':
      return {
        isNew: true
      }
      break;
    case 'LIST_ASSET_ITEM_EDIT_MODIFY':
      return {
        isNew: false,
        assetItem: action.assetItem
      }
      break;
    default:
      return state;
  }
};

var list = combineReducers({ snapshots, snapshotEdit, assetItemEdit });

export default list;