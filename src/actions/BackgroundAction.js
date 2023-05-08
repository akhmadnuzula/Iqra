import axios from 'axios';
import BackgroundActions from 'react-native-background-actions';
import {
  getById,
  insert,
  update,
  dategetById,
  dateupdate,
  dateinsert,
} from '../databases';
import moment from 'moment';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const veryIntensiveTask = async taskDataArguments => {
  // Example of an infinite loop task
  const {delay} = taskDataArguments;
  await new Promise(async resolve => {
    for (let i = 0; BackgroundActions.isRunning(); i++) {
      console.log(i);
      // cek date
      taskByDate();
      await sleep(delay);
    }
  });
};

const options = {
  taskName: 'IqraTask',
  taskTitle: 'Iqra',
  taskDesc: 'Iqra berjalan di latar belakang',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    // delay: 300000, //5 menit
    delay: 1000000, //5 detik
  },
};

export const singleTask = () => {
  BackgroundActions.stop();
  // BackgroundActions.updateNotification({
  //   taskDesc: 'New ExampleTask description',
  // });
  taskByDate();
  setTimeout(() => {
    BackgroundActions.start(veryIntensiveTask, options);
  }, 10000);
  // console.log(BackgroundActions.isRunning());
  // if (BackgroundActions.isRunning() === false) {
  //   BackgroundActions.start(veryIntensiveTask, options);
  // } else {
  //   BackgroundActions.stop();
  //   setTimeout(() => {
  //     BackgroundActions.start(veryIntensiveTask, options);
  //   }, 10000);
  // }
};
// Only Android, iOS will ignore this call
// iOS will also run everything here in the background until .stop() is called

// const apiGetSurah = async () => {
//   await axios
//     .get('https://api-quran.nusastory.com/surahs')
//     .then(ress => {
//       let json = JSON.stringify(ress.data);
//       return json;
//     })
//     .catch(err => {
//       console.log(err);
//       return [];
//     });
// };

export const taskByDate = async () => {
  let cekDate = await dategetById(1);
  if (cekDate) {
    let dateNow = new Date(moment());
    dateNow.setDate(dateNow.getDate() + 1);
    let dateDb = new Date(moment(cekDate.date).format('YYYY-MM-DD'));
    if (dateDb > dateNow) {
      dateDb.setDate(dateDb.getDate() + 1);
      await dateupdate({
        id: 1,
        date: moment(dateDb).format('YYY-MM-DD'),
      });
      await randomAyah();
    }
  } else {
    await dateinsert({
      id: 1,
      date: moment().format('YYYY-MM-DD'),
    });
    await randomAyah();
  }
};

const apiGetSurah = async () => {
  try {
    const ress = await axios.get('https://api-quran.nusastory.com/surahs');
    return ress.data;
  } catch (err) {
    console.log(`Error while fetching surah: ${err.message}`);
    return null;
  }
};

const apiGetAyah = async (numberOfSurah, numberOfAyahs) => {
  let ayah = Math.floor(Math.random() * numberOfAyahs);
  try {
    const ress = await axios.get(
      `https://api-quran.nusastory.com/surahs/${numberOfSurah}/ayahs/${ayah}`,
    );
    return ress.data;
  } catch (err) {
    console.log(`Error while fetching ayah: ${err.message}`);
    return null;
  }
};

// const apiGetAyah = async (numberOfSurah, numberOfAyahs) => {
//   let ayah = Math.floor(Math.random() * numberOfAyahs);
//   await axios
//     .get(
//       `https://api-quran.nusastory.com/surahs/${numberOfSurah}/ayahs/${ayah}`,
//     )
//     .then(ress => {
//       return ress.data;
//     })
//     .catch(err => {
//       console.log(err);
//       return [];
//     });
// };

export const randomAyah = async () => {
  const objSurah = await getById(1);
  if (objSurah) {
    let surat = await apiGetSurah();
    const randomElement = surat[Math.floor(Math.random() * surat.length)];
    let s = randomElement.number;
    let ayah = await apiGetAyah(s, randomElement.numberOfAyahs);
    let data = {
      id: 1,
      surahName: randomElement.name,
      surahTranslate: randomElement.translation,
      surahNumber: Number(randomElement.number || 0),
      revelation: randomElement.revelation,
      ayah: Number(ayah.number.inSurah),
      arab: ayah.arab,
      translation: ayah.translation,
      tafsir: ayah.tafsir.kemenag.long,
    };
    await update(data);
    return data;
  } else {
    let surat = await apiGetSurah();
    const randomElement = surat[Math.floor(Math.random() * surat.length)];
    let s = randomElement.number;
    let ayah = await apiGetAyah(s, randomElement.numberOfAyahs);

    let data = {
      id: 1,
      surahName: randomElement.name,
      surahTranslate: randomElement.translation,
      surahNumber: Number(randomElement.number || 0),
      revelation: randomElement.revelation,
      ayah: Number(ayah.number.inSurah),
      arab: ayah.arab,
      translation: ayah.translation,
      tafsir: ayah.tafsir.kemenag.long,
    };
    await insert(data);
    return data;
  }
};
