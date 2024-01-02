import React, {useState, useEffect} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchClarif} from '../utils/fetchClarif';

const HomeScreen: React.FC = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState([]); // Utilisez l'état pour stocker votre tableau
  const [dataType, setDataType] = useState([]); // Utilisez l'état pour stocker votre tableau

  console.log('data', data, 'dataType', dataType);
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
          // console.log('Data retrieved successfully:', parsedData);
        } else {
          // console.log('Data not found!');
        }
      } catch (error) {
        // console.error('Error reading data:', error);
      }
    };

    fetchData();
  }, []);

  const updateData = async () => {
    try {
      const clarifResult = await fetchClarif(text);
      console.log('clarifResult', clarifResult);

      const updatedData = [...data, text];
      const updatedDataType = [...dataType, clarifResult];
      setData(updatedData);
      await setDataType(updatedDataType);

      await AsyncStorage.setItem(
        'images_type',
        JSON.stringify(updatedDataType),
      );
      await AsyncStorage.setItem('images_url', JSON.stringify(updatedData));

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
  };

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('images_url');
      if (value !== null) {
        const parsedData = JSON.parse(value);
        setData(parsedData);
        // console.log('Data retrieved successfully:', parsedData);
      } else {
        // console.log('Data not found!');
      }
    } catch (error) {
      // console.error('Error reading data:', error);
    }
  };

  const Cloth = ({item, index}: {item: string; index: number}) => {
    // console.log('item', item);
    return (
      <>
        <Image source={{uri: item}} style={{width: 100, height: 100}} />
        <View>
          <Text>{dataType[index]}</Text>
        </View>
      </>
    );
  };

  return (
    <>
      <Text>HomeScreen</Text>
      <TextInput
        placeholder="Nom de l'image"
        onChangeText={handleTextChange}
        value={text}
      />
      <Button title="Valider" onPress={handleButtonPress} />
      <Button title="Tout Supprimer" onPress={clearAllData} />

      <FlatList
        data={data}
        renderItem={Cloth}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export default HomeScreen;
