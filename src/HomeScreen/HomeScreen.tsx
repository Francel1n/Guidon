/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchClarif} from '../utils/fetchClarif';

const HomeScreen: React.FC = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState([]); // Utilisez l'état pour stocker votre tableau
  const [clothesType, setclothesType] = useState([]); // Utilisez l'état pour stocker votre tableau

  console.log('data', data, 'clothesType', clothesType);
  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared successfully!');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('images_url');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setData(parsedData);
          console.log('Data retrieved successfully:', parsedData);
        } else {
          console.log('Data not found!');
        }
      } catch (error) {
        console.error('Error reading data:', error);
      }
      try {
        const storedData = await AsyncStorage.getItem('images_type');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setclothesType(parsedData);
          console.log('Data retrieved successfully:', parsedData);
        } else {
          console.log('Data not found!');
        }
      } catch (error) {
        console.error('Error reading data:', error);
      }
    };

    fetchData();
  }, []);

  const updateData = async () => {
    try {
      const {cloth, color} = await fetchClarif(text);
      console.log(cloth, 'coocococcocococ');
      setData([...data, text]);
      await setclothesType([...clothesType, cloth]);

      AsyncStorage.setItem('images_type', JSON.stringify(clothesType));
      AsyncStorage.setItem('images_url', JSON.stringify(data));

      // console.log('Data saved successfully!');
    } catch (error) {
      // console.error('Error saving data:', error);
    }
  };

  const handleTextChange = (textInTheInput: string) => {
    setText(textInTheInput);
  };

  const handleButtonPress = () => {
    // Vous pouvez utiliser la valeur de 'text' comme nécessaire
    Alert.alert('Texte saisi :', text);
    updateData();
    setText('');
  };

  // const readData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('images_url');
  //     if (value !== null) {
  //       const parsedData = JSON.parse(value);
  //       setData(parsedData);
  //       console.log('Data retrieved successfully:', parsedData);
  //     } else {
  //       console.log('Data not found!');
  //     }
  //   } catch (error) {
  //     console.error('Error reading data:', error);
  //   }
  // };

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      margin: 10,
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#B76E79', // Couleur d'accent
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginBottom: 10,
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#B76E79', // Couleur d'accent
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  const Cloth = ({item, index}: {item: string; index: number}) => {
    console.log(clothesType[index]);
    console.log(clothesType);
    return (
      <View style={styles.container}>
        <Image source={{uri: item}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{clothesType[index]}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor: '#F2F2F2'}}>
      <Text
        style={{
          fontSize: 42,
          textAlign: 'center',
          fontWeight: 'bold',
          padding: 16,
          color: '#001F3F',
        }}>
        Guidon
      </Text>
      <TextInput
        placeholder="Nom de l'image"
        onChangeText={handleTextChange}
        value={text}
      />
      <Button title="Valider" onPress={handleButtonPress} />
      <Button title="Tout Supprimer" onPress={clearAllData} />
      <FlatList
        // style={{flex: 1}}
        data={data}
        renderItem={Cloth}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};

export default HomeScreen;
