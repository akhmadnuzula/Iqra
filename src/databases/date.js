import {SCHEMA_DATE, RealmInstance} from './schemas';

export const dategetAll = () => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then(realm => {
        let obj = realm.objects(SCHEMA_DATE);
        resolve(obj);
      })
      .catch(error => reject(error));
  });
};

export const dategetById = id => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then(realm => {
        let obj = realm.objectForPrimaryKey(SCHEMA_DATE, id);
        resolve(obj);
      })
      .catch(error => reject(error));
  });
};

export const dateinsert = data => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then(realm => {
        realm.write(() => {
          let obj = realm.create(SCHEMA_DATE, data);
          resolve(obj);
        });
      })
      .catch(error => reject(error));
  });
};

export const dateupdate = data => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then(realm => {
        realm.write(() => {
          let obj = realm.objectForPrimaryKey(SCHEMA_DATE, data.id);
          obj.date = data.date;
          resolve(obj);
        });
      })
      .catch(error => reject(error));
  });
};

export const datedeteleById = id => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then(realm => {
        let obj = realm.objectForPrimaryKey(SCHEMA_DATE, id);
        realm.delete(obj);
        resolve();
      })
      .catch(error => reject(error));
  });
};

export const datedeleteAll = () => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then(realm => {
        realm.write(() => {
          let obj = realm.objects(SCHEMA_DATE);
          realm.delete(obj);
          resolve();
        });
      })
      .catch(error => reject(error));
  });
};
