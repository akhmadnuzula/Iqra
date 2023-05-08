import {StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import IqraIcon from '../assets/logo2.png';
import {StackActions} from '@react-navigation/native';
import {surah, randomAyah} from '../actions/BackgroundAction';
import {singleTask} from '../actions/BackgroundAction';

const SplashScreen = ({navigation}) => {
  // useLayoutEffect
  useLayoutEffect(() => {
    // jika layout di pages splashscreen maka disable header
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Home'));
    }, 3000);
  }, []);
  const quotesArray = [
    'Sudahkah anda meluangkan membaca Al-Quran hari ini?',
    'Lelahmu akan berubah manis ketika niatnya lillah karena Allah',
    'Al-Quran menenangkan hati yang sakit dan memberi tahu kita bahwa Allah lebih dekat dengan kita daripada urat leher kita',
    'Keikhlasan bisa membuat amal yang kecil bernilai besar',
    'Membaca Al-Quran adalah cara paling sederhana untuk mendapatkan dan melipatgandakan pahala',
    'Bukanlah kesabaran jika masih mempunyai batas dan bukanlah keikhlasan jika masih merasakan sakit',
    'Bacalah Al-Quran karena ia akan datang sebagai pemberi syafaat bagi para penghafalnya pada hari kiamat',
    'Takdir itu milik Allah, namun usaha dan doa adalah milik kita',
    'Tetaplah bersabar meskipun terasa seluruh duniamu berantakan. Allah tahu lelahmu',
    'Semakin kamu menyerahkan semua urusanmu kepada Allah, maka semakin tenang hatimu',
    'Barangsiapa membaca dua ayat terakhir dari Surat Al-Baqarah setiap malam, itu cukup baginya',
    'Barangsiapa yang menghafal sepuluh ayat pertama dari Surat Al-Kahfi, ia akan dilindungi dari Dajjal',
    'Bacalah Surat Al-Mulk untuk menjaga diri dari siksa kubur',
    'Doa harusnya menjadi pembuka di pagi hari dan menjadi penutup di waktu malam hari',
    'Barangsiapa membaca seratus ayat dalam satu malam (dalam shalat), maka ditulis baginya seolah-olah dia berdiri untuk shalat sepanjang malam',
    'Bila hijrahmu karena Allah, kamu akan terus melangkah walaupun sudah lelah',
    'Barangsiapa membaca Surat Al-Kahfi pada hari Jumat, dia akan disinari cahaya di antara dua Jumat',
    'Sebaik-baik kalian adalah yang mempelajari Al-Quran dan mengajarkannya',
    'Takkan pernah ada yang senantiasa bersamamu dalam setiap situasi, kecuali Allah',
    'Setiap kali kamu ingin berbicara dengan Allah SWT, segeralah shalat. Kapan pun kamu ingin mendengar Allah, bacalah Al-Quran',
    'Rahasia kebahagiaan itu ada dalam 3 hal: Bersabar, bersyukur dan ikhlas',
  ];

  const randomQuotes =
    quotesArray[Math.floor(Math.random() * quotesArray.length)];
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={IqraIcon}
        style={{width: 80, height: 80, marginBottom: 10}}
      />
      <ActivityIndicator size={'small'} animating={true} />
      <Text style={{marginHorizontal: 20, textAlign: 'center'}}>
        {randomQuotes}
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
