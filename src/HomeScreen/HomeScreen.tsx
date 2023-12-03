import React, { useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';

const HomeScreen: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<any | null>(null);

    const pickImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
        }, response => {
            if (response.didCancel) {
                console.log("L'utilisateur a annulé la sélection d'image");
            } else if (response.errorMessage) {
                console.error("Erreur lors de la sélection d'image:", response.errorMessage);
            } else {
                if (response.assets && response.assets.length > 0) {
                  setSelectedImage(response.assets[0]);
                }            }
        });
    };

    return (
        <>
            <Text>HomeScreddden</Text>
            {!!selectedImage && (
                <View style={{ borderColor: 'red', borderWidth: 10 }}>
                    <Image source={{ uri: selectedImage.uri }} style={{ width: selectedImage.width, height: selectedImage.height }} />
                </View>
            )}
            <Button title="Choisir une image" onPress={pickImage} />
        </>
    );
};

export default HomeScreen;
