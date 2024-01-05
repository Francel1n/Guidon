/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import HomeScreen from './src/HomeScreen/HomeScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('key', 'value');
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  saveData();

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <HomeScreen />
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
