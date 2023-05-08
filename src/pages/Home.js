import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getById} from '../databases';
import {taskByDate, randomAyah} from '../actions/BackgroundAction';
import InfoIcon from '../assets/info.png';
import Modal from 'react-native-modal';

const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getObj('random');
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);

  const [surah, setSurah] = useState({
    id: 0,
    surahName: '',
    surahTranslate: '',
    surahNumber: 0,
    revelation: '',
    ayah: 0,
    arab: '',
    translation: '',
    tafsir: '',
  });

  const getObj = async stt => {
    if (stt === 'random') {
      await randomAyah();
    } else {
      await taskByDate();
    }

    var obj = await getById(1);
    if (obj === null) {
      obj = await randomAyah();
    }
    setSurah(obj);
    console.log(obj);
  };

  useEffect(() => {
    getObj();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{padding: 20}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 16, marginBottom: 0, fontWeight: 'bold'}}>
            {surah.surahNumber || ''}. {surah.surahName || ''} (
            {surah.surahTranslate})
          </Text>
          <Text style={{fontSize: 16, marginBottom: 15}}>
            {surah.revelation}, ayat {surah.ayah || ''}
          </Text>
          <Text style={{fontSize: 24, marginBottom: 15, fontWeight: 'bold'}}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </Text>
        </View>
        <Text style={{fontSize: 20, marginBottom: 15}}>{surah.arab || ''}</Text>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Arti</Text>
        <Text style={{fontSize: 16, marginBottom: 10}}>
          {surah.translation || ''}
        </Text>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Tafsir (Kemenag)</Text>
        <Text style={{fontSize: 16, marginBottom: 15}}>
          {surah.tafsir || ''}
        </Text>
        <View style={{marginBottom: 50}}>
          <Text style={{fontWeight: 'bold'}}>License</Text>
          <Text>Apps By: Akh Firdausi Nuzula M (TI)</Text>
          <Text>
            Special Thanks for Allah SWT, STMIK Antar Bangsa, R.M. Reza (Quran
            API ID)
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={toggleModal}
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 30,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 30,
          backgroundColor: '#fff',
          borderRadius: 100,
        }}>
        <Image source={InfoIcon} style={{height: 30, width: 30}} />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={{backgroundColor: '#fff', padding: 20}}>
          <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold'}}>
            Iqra
          </Text>
          <Text>
            Iqra adalah aplikasi Al-Quran dengan ayat acak setiap harinya
          </Text>
          <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold'}}>
            Fitur
          </Text>
          <Text>1. Ayat acak setiap hari</Text>
          <Text>2. Ganti manual ayat dengan menarik layar ke bawah</Text>
          <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold'}}>
            Lisensi
          </Text>
          <Text>Apps By: Akh Firdausi Nuzula M (TI)</Text>
          <Text>
            Special Thanks for Allah SWT, STMIK Antar Bangsa, R.M. Reza (Quran
            API ID)
          </Text>
          <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold'}}>
            Informasi, Saran & Kritik
          </Text>
          <Text>1. akhmadnuzula (Github, Linkedin)</Text>
          <Text>2. akhmadnuzula@gmail.com (Email)</Text>
          <View style={{paddingHorizontal: '30%', marginTop: 20}}>
            <TouchableOpacity
              onPress={toggleModal}
              style={{backgroundColor: '#02b2c9', paddingVertical: 5}}>
              <Text style={{textAlign: 'center', color: '#fff', fontSize: 16}}>
                Tutup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
