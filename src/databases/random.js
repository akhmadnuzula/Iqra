import {SCHEMA_RANDOM, RealmInstance} from './schemas';

export const getAll = () => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then(realm => {
        let obj = realm.objects(SCHEMA_RANDOM);
        resolve(obj);
      })
      .catch(error => reject(error));
  });
};

export const getById = id => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then(realm => {
        let obj = realm.objectForPrimaryKey(SCHEMA_RANDOM, id);
        resolve(obj);
      })
      .catch(error => reject(error));
  });
};

export const insert = data => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then(realm => {
        realm.write(() => {
          let obj = realm.create(SCHEMA_RANDOM, data);
          resolve(obj);
        });
      })
      .catch(error => reject(error));
  });
};

export const update = data => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then(realm => {
        realm.write(() => {
          let obj = realm.objectForPrimaryKey(SCHEMA_RANDOM, data.id);
          obj.id = data.id;
          obj.surahName = data.surahName;
          obj.surahTranslate = data.surahTranslate;
          obj.surahNumber = data.surahNumber;
          obj.ayah = data.ayah;
          obj.arab = data.arab;
          obj.translation = data.translation;
          obj.tafsir = data.tafsir;
          resolve(obj);
        });
      })
      .catch(error => reject(error));
  });
};

export const deteleById = id => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then(realm => {
        let obj = realm.objectForPrimaryKey(SCHEMA_RANDOM, id);
        realm.delete(obj);
        resolve();
      })
      .catch(error => reject(error));
  });
};

export const deleteAll = () => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then(realm => {
        realm.write(() => {
          let obj = realm.objects(SCHEMA_RANDOM);
          realm.delete(obj);
          resolve();
        });
      })
      .catch(error => reject(error));
  });
};
