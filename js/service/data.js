import Realm from 'realm';

const SNAPSHOT = 'Snapshot';
const ASSET_ITEM = 'AssetItem';

const AssetItemSchema = {
  name: ASSET_ITEM,
  properties: {
    no: 'int',
    platform: 'string',
    risk: 'string',
    term: 'string',
    name: 'string',
    amount: 'int'
  }
};

const SnapshotSchema = {
  name: SNAPSHOT,
  primaryKey: 'date',
  properties: {
    date: 'string',
    assetItems: 'AssetItem[]'
  }
};

class Data {
  _realm;

  init() {
    // Initialize a Realm
    this._realm = new Realm({ schema: [AssetItemSchema, SnapshotSchema] });
    console.log('Open realm.');

    // this.test();
  }

  destroy() {
    this._realm && this._realm.close();
    console.log('Close realm.');
  }

  saveSnapshot(snapshot) {
    this._realm.write(() => {
      this._realm.create(SNAPSHOT, snapshot, true);
    });
  }

  deleteSnapshot(date) {
    this._realm.write(() => {
      var items = this._realm.objects(SNAPSHOT)
        .filtered('date = "' + date + '"');

      if (items.length > 0) {
        this._realm.delete(items);
      }
    });
  }

  getSnapshot(date) {
    var items = this._realm.objects(SNAPSHOT)
      .filtered('date = "' + date + '"')
      .slice(0, 1);

    if (items.length > 0) {
      return this.cloneSnapshot(items[0]);
    }
    return null;
  }


  getLastSnapshot() {
    var items = this._realm.objects(SNAPSHOT)
      .sorted('date', true)
      .slice(0, 1);

    if (items.length > 0) {
      return this.cloneSnapshot(items[0]);
    }
    return null;
  }

  getPrevSnapshot(date) {
    var items = this._realm.objects(SNAPSHOT)
      .filtered('date < "' + date + '"')
      .sorted('date', true)
      .slice(0, 1);

    if (items.length > 0) {
      return this.cloneSnapshot(items[0]);
    }
    return null;
  }

  getNextSnapshot(date) {
    var items = this._realm.objects(SNAPSHOT)
      .filtered('date > "' + date + '"')
      .sorted('date', true)
      .slice(0, 1);

    if (items.length > 0) {
      return this.cloneSnapshot(items[0]);
    }
    return null;
  }

  getSnapshotList(date, count, desc) {
    var items = this._realm.objects(SNAPSHOT);
    if (date) {
      items = items.filtered('date <= "' + date + '"');
    }

    if (desc) {
      items = items.sorted('date', true);
    }

    if (count > 0) {
      items = items.slice(0, count);
    }

    var result = [];
    items.forEach(element => {
      result.push(this.cloneSnapshot(element));
    });
    
    return result;
  }

  cloneSnapshot(item) {
    var cloneItem = {
      date: item.date,
      assetItems: []
    };

    var amount = 0;

    item.assetItems.forEach((element) => {
      cloneItem.assetItems.push(this.cloneAssetItem(element));
      amount += element.amount;
    });

    cloneItem.amount = amount;

    return cloneItem;
  }

  cloneAssetItem(item) {
    return {
      no: item.no,
      platform: item.platform,
      risk: item.risk,
      term: item.term,
      name: item.name,
      amount: item.amount
    };
  }

  test(){
    var snapshot = {
      date:'2018-01-02',
      assetItems:[]
    };

    snapshot.assetItems.push({
      no: 0,
      platform: 'bank',
      risk: 'low',
      term: 'short',
      name: 'xxxxx',
      amount: 14274
    });

    snapshot.assetItems.push({
      no: 1,
      platform: 'bank',
      risk: 'low',
      term: 'long',
      name: 'yyyyy',
      amount: 41274
    });

    this.deleteSnapshot('2018-01-01');
    this.deleteSnapshot('2018-01-02');
    console.log('[test]deleteSnapshot');

    this.saveSnapshot(snapshot);
    console.log('[test]saveSnapshot insert');

    console.log('[test]getSnapshotList');
    console.log(JSON.stringify(this.getSnapshotList(null, 0, true)));

    snapshot.assetItems.push({
      no: 2,
      platform: 'bank',
      risk: 'low',
      term: 'long',
      name: 'zzzzz',
      amount: 41274
    });
    this.saveSnapshot(snapshot);
    console.log('[test]saveSnapshot update');

    console.log('[test]getSnapshotList');
    console.log(JSON.stringify(this.getSnapshotList(null, 0, true)));

    snapshot.assetItems.length = 1;
    this.saveSnapshot(snapshot);
    console.log('[test]saveSnapshot update');
    console.log('[test]getSnapshotList');
    console.log(JSON.stringify(this.getSnapshotList(null, 0, true)));


    this.deleteSnapshot('2018-01-02');
    console.log('[test]deleteSnapshot');

    console.log('[test]getSnapshotList');
    console.log(JSON.stringify(this.getSnapshotList(null, 0, true)));
  }
};

export default new Data();