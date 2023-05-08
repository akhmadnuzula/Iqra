import Realm from 'realm';

export const SCHEMA_RANDOM = 'Random';
export const SCHEMA_DATE = 'Date';

export const schemaRandom = {
  name: SCHEMA_RANDOM,
  primaryKey: 'id',
  properties: {
    id: 'int',
    surahName: 'string',
    surahTranslate: 'string',
    surahNumber: 'int',
    revelation: 'string',
    ayah: 'int',
    arab: 'string',
    translation: 'string',
    tafsir: 'string',
  },
};

export const schemaDate = {
  name: SCHEMA_DATE,
  primaryKey: 'id',
  properties: {
    id: 'int',
    date: 'date',
  },
};

const databaseOption = {
  path: 'DatabaseIqro',
  schema: [schemaRandom, schemaDate],
  schemaVeersion: 0,
};

export class RealmInstance {
  static instance = null;

  static getInstance() {
    if (!RealmInstance.instance) {
      RealmInstance.instance = Realm.open(databaseOption);
    }

    return RealmInstance.instance;
  }
}
