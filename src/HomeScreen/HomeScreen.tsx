import React, {useState} from 'react';
import {Button, Image, Text, View} from 'react-native';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';
import {fetchClarif} from '../utils/fetchClarif';

const HomeScreen: React.FC = () => {
  const [garments, setGarments] = useState([]);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel) {
          console.log("L'utilisateur a annulé la sélection d'image");
        } else if (response.errorMessage) {
          console.error(
            "Erreur lors de la sélection d'image:",
            response.errorMessage,
          );
        } else {
          if (response.assets && response.assets.length > 0) {
            setSelectedImage(response.assets[0]);
          }
        }
      },
    );
  };
  fetchClarif()
  // fetchClarif().then((result) => {
  //   setGarments([...garments, result]);
  // });

  return (
    <>
      <Text>HomeScreen</Text>
      {!!selectedImage && (
        <View style={{borderColor: 'red', borderWidth: 10}}>
          <Image
            source={{uri: selectedImage.uri}}
            style={{width: selectedImage.width, height: selectedImage.height}}
          />
        </View>
      )}
      <Button title="Choisir une image" onPress={pickImage} />
    </>
  );
};

export default HomeScreen;
