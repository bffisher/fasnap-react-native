import { take, put, fork, select } from 'redux-saga/effects';

import selectList from './select';
import { PAGES } from '../../constants/actionTypes';
import dataServ from '../../service/data';

const { SNAPSHOTS, SNAPSHOT_EDIT, ASSET_ITEM_EDIT } = PAGES.LIST;

function* watchSnapshotsInit() {
  for (; ;) {
    yield take(SNAPSHOTS.INIT);
    const snapshots = dataServ.getSnapshotList(null, null, true);
    yield put({ type: SNAPSHOTS.RESET, snapshots });
  }
};

function* watchSnapshotsDelete() {
  for (; ;) {
    const { date } = yield take(SNAPSHOTS.DELETE);
    dataServ.deleteSnapshot(date);
    yield put({ type: SNAPSHOTS.DELETE_OK, date });
  }
};

function* watchSnapshotEditDateChanged() {
  for (; ;) {
    const { date } = yield take(SNAPSHOT_EDIT.CHANGE_DATE);
    const snapshot = dataServ.getSnapshot(date);

    if (snapshot) {
      yield put({ type: SNAPSHOT_EDIT.MODIFY, snapshot });
    } else {
      yield put({ type: SNAPSHOT_EDIT.NEW, date });
    }
  }
};

function* watchSnapshotEditSave() {
  for (; ;) {
    const { isNew, snapshot } = yield take(SNAPSHOT_EDIT.SAVE);
    dataServ.saveSnapshot(snapshot);

    if (isNew) {
      yield put({ type: SNAPSHOTS.ADD, snapshot });
    } else {
      yield put({ type: SNAPSHOTS.MODIFY, snapshot });
    }
  }
};

function* watchSnapshotEditImportAssetItemsOfLast() {
  for (; ;) {
    yield take(SNAPSHOT_EDIT.IMPORT_ASSET_ITEMS_OF_LAST);
    const { snapshots } = yield select(selectList);
    if (snapshots && snapshots.length > 0) {
      yield put({ type: SNAPSHOT_EDIT.IMPORT_ASSET_ITEMS, assetItems: snapshots[0].assetItems });
    }
  }
};

export default function* () {
  yield fork(watchSnapshotsInit);
  yield fork(watchSnapshotsDelete);
  yield fork(watchSnapshotEditDateChanged);
  yield fork(watchSnapshotEditSave);
  yield fork(watchSnapshotEditImportAssetItemsOfLast);
};