import { combineReducers } from 'redux';

var snapshots = function(state = [], action){
  switch (action.type) {
    case 'LIST_INIT_SNAPSHOTS':
      return [{ date: '2018-01-02', amount: 11111 }];
    case 'LIST_ADD_SNAPSHOT':
      return [...state, action.addedItem];
    case 'LIST_DELETE_SNAPSHOT':
      return state.filter(snapshot => (snapshot.date !== action.date));
    case 'LIST_MODIFY_SNAPSHOT':
      return state.map(snapshot => (snapshot.date === action.editedItem.date) ? action.editedItem : snapshot);
    default:
      return state;
  }
};

var list = combineReducers({snapshots});

export default list;