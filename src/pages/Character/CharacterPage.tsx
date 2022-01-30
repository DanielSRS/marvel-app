import React from 'react';
import {View, Text, Image} from 'react-native';

import {characterData, comics} from '../../services/api/apiTypes';

import {StackScreenProps} from '@react-navigation/stack';

import styles from './CharacterStyles';
import {getAuthCredentials} from '../../services/api/api';
import {ScrollView} from 'react-native-gesture-handler';

type RootStackParamList = {
  Character: {character: characterData};
};

type Props = StackScreenProps<RootStackParamList, 'Character'>;

const CharacterPage = ({route, navigation}: Props) => {
  const character = route.params.character;

  if (!character) {
    navigation.goBack();
  }

  navigation.setOptions({title: character.name});

  const credentials = getAuthCredentials();

  const imageURL = `${character.thumbnail.path}.${character.thumbnail.extension}?apikey=${credentials.apikey}&ts=${credentials.ts}&hash=${credentials.hash}`;

  return (
    <ScrollView>
      <View>
        <View style={[styles.card, styles.profileCard]}>
          <View style={styles.pictureContainer}>
            <Image
              style={styles.profilePicture}
              width={150}
              source={{
                uri: imageURL,
              }}
            />
          </View>
          <View style={styles.pictureContainer}>
            <View style={[styles.descriptionContainer]}>
              <Text style={styles.descriptionText}>{`${
                character.description !== ''
                  ? character.description
                  : 'Descrição não disponível'
              }`}</Text>
            </View>
          </View>
        </View>
        <CharacterComics quadrinhos={character.comics} />
      </View>
    </ScrollView>
  );
};

const CharacterComics = ({quadrinhos}: {quadrinhos: comics}) => {
  const allcomics = quadrinhos.items.map((item, index) => {
    return (
      <View key={index}>
        <Text>{item.name}</Text>
      </View>
    );
  });
  return (
    <View style={[styles.card, styles.comicsCard]}>
      {allcomics}
      {}
    </View>
  );
};

export default CharacterPage;
