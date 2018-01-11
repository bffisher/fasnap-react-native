import { combineReducers } from 'redux';

import { PAGES } from '../../constants/actionTypes';
import { Util } from '../../util';

var { SNAPSHOTS, SNAPSHOT_EDIT, ASSET_ITEM_EDIT } = PAGES.LIST;

var calculateAmount = function (snapshot) {
  var amount = 0;
  snapshot.assetItems.forEach((element) => {
    amount += element.amount;
  });
  snapshot.amount = amount;
};

var snapshots = function (state = [], action) {
  switch (action.type) {
    case SNAPSHOTS.RESET:
      return action.snapshots;
    case SNAPSHOTS.ADD:
      let result = [], len = state.length, inserted = false;
      for (let i = 0; i < len; i++) {
        if (!inserted && action.snapshot.date >= state[i].date) {
          result.push(action.snapshot);
          inserted = true;
        }
        result.push(state[i]);
      }
      return result;
    case SNAPSHOTS.DELETE_OK:
      return state.filter(snapshot => (snapshot.date !== action.date));
    case SNAPSHOTS.MODIFY:
      return state.map(snapshot => (snapshot.date === action.snapshot.date) ? action.snapshot : snapshot);
    default:
      return state;
  }
};

var snapshotEdit = function (state = {}, action) {
  switch (action.type) {
    case SNAPSHOT_EDIT.NEW:
      return {
        isNew: true,
        snapshot: {
          date: action.date ? action.date : '',
          assetItems: []
        }
      };
    case SNAPSHOT_EDIT.MODIFY:
      return {
        isNew: false,
        snapshot: action.snapshot
      };
    case SNAPSHOT_EDIT.ADD_ASSET_ITEM:
      state.snapshot.assetItems = [...state.snapshot.assetItems, action.assetItem];
      state.snapshot.assetItems.forEach((element) => {
        element.amount = 0;
      });
      state.snapshot.amount = 0;
      return {
        isNew: state.isNew,
        snapshot: state.snapshot
      };
    case SNAPSHOT_EDIT.MODIFY_ASSET_ITEM:
      state.snapshot.assetItems = state.snapshot.assetItems.map(item => (item.no === action.assetItem.no) ? action.assetItem : item);
      calculateAmount(state.snapshot);
      return {
        isNew: state.isNew,
        snapshot: state.snapshot
      };
    case SNAPSHOT_EDIT.DELETE_ASSET_ITEM:
      state.snapshot.assetItems = state.snapshot.assetItems.filter(item => (item.no !== action.no));
      calculateAmount(state.snapshot);
      return {
        isNew: state.isNew,
        snapshot: state.snapshot
      };
    case SNAPSHOT_EDIT.IMPORT_ASSET_ITEMS:
      state.snapshot.assetItems = action.assetItems;
      calculateAmount(state.snapshot);
      return {
        isNew: state.isNew,
        snapshot: state.snapshot
      };
    default:
      return state;
  }
};

var assetItemEdit = function (state = {}, action) {
  switch (action.type) {
    case ASSET_ITEM_EDIT.NEW:
      return {
        isNew: true,
        saveButtionStatus: false,
        assetItem: { no: action.no }
      };
    case ASSET_ITEM_EDIT.MODIFY:
      return {
        isNew: false,
        saveButtionStatus: false,
        assetItem: action.assetItem
      };
    case ASSET_ITEM_EDIT.CHANGE_SAVE_BUTTION_STATUS:
      return {
        isNew: state.isNew,
        saveButtionStatus: action.saveButtionStatus,
        assetItem: state.assetItem
      };
    default:
      return state;
  }
};

var list = combineReducers({ snapshots, snapshotEdit, assetItemEdit });

export default list;