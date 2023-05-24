import {StyleSheet, View, Image, ToastAndroid, BackHandler} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {singleTask} from './src/actions/BackgroundAction';

import SplashScreen from './src/pages/SplashScreen';
import Home from './src/pages/Home';
import IqraIcon from './src/assets/logo2.png';

import codePush from 'react-native-code-push';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};

// fungsi untuk mendeklarasikan create native stack navigator
const Stack = createNativeStackNavigator();

// fungsi untuk membuat navbar
const Navbar = ({route, navigation}) => {
  // return ui navbar
  return (
    <View style={styles.view}>
      <Image source={IqraIcon} style={styles.logo} />
    </View>
  );
};

// fungsi utama App
const App = () => {
  const navigationRef = React.useRef();
  const [exitApp, SETexitApp] = useState(false);

  useEffect(() => {
    singleTask();
    // check new push code
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }, []);

  // useEffect untuk aksi ketika pertama dibuka dan ketika ada respon
  useEffect(() => {
    // fungsi back button pada handphone
    const backAction = () => {
      // jika halaman adaalh menu
      if (navigationRef.current?.getCurrentRoute().name === 'Home') {
        // jika const exitApp itu false
        if (exitApp === false) {
          // set ke false
          SETexitApp(true);
          ToastAndroid.showWithGravityAndOffset(
            'Tekan sekali lagi untuk keluar',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          // jika exitApp true
        } else if (exitApp === true) {
          // arahkan keluar aplikasi
          BackHandler.exitApp();
        }
        // set timeout untuk diarahkan keluar lagi
        setTimeout(() => {
          SETexitApp(false);
        }, 1500);
        return true; // disable back button
      }
      console.log('false keluar, back button true');
      return false; // allow back button
    };

    // fungsi listener ketika back di klik, diarahkan ke fungsi backAction
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // fungsi back dihapus
    return () => backHandler.remove();
  });

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{header: Navbar}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default codePush(codePushOptions)(App);

const styles = StyleSheet.create({
  view: {
    height: 70,
    paddingVertical: 10,
    backgroundColor: '#fffffe',
    paddingHorizontal: 20,
    flexDirection: 'row',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
  },
  logout: {
    width: 22,
    height: 22,
  },
  back: {
    width: 20,
    height: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
