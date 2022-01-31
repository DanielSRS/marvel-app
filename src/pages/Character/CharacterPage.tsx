import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {characterData, ComicDataWrapper} from '../../services/api/apiTypes';
import {StackScreenProps} from '@react-navigation/stack';
import styles from './CharacterStyles';
import {
  credentialsProps,
  getAuthCredentials,
  getComicsByCharacterID,
} from '../../services/api/api';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

type RootStackParamList = {
  Character: {character: characterData};
};

type Props = StackScreenProps<RootStackParamList, 'Character'>;

const CharacterPage = ({route, navigation}: Props) => {
  const character = route.params.character;

  if (!character) {
    navigation.goBack();
  }

  useEffect(() => {
    navigation.setOptions({title: character.name});
  }, [character, navigation]);

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
        <CharacterComics id={character.id} credentials={credentials} />
      </View>
    </ScrollView>
  );
};

const CharacterComics = ({
  id,
  credentials,
}: {
  id: number;
  credentials: credentialsProps;
}) => {
  const [comicData, setComicData] = useState<ComicDataWrapper>();

  const searchComics = useCallback(
    async (characterId = id) => {
      const res = await getComicsByCharacterID({characterId});
      if (res.error) {
        console.log('SearchPage: search error: ' + res.error);
        console.log('SearchPage: search error: ' + res.error.response);
        return;
      }
      setComicData(res.response);
    },
    [id],
  );

  useEffect(() => {
    searchComics();
  }, [searchComics]);

  const itemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  return (
    <View style={[styles.card, styles.comicsCard]}>
      <Text style={styles.comicCardTitle}>Comic appearances</Text>
      <FlatList
        data={comicData?.data.results}
        keyExtractor={({id: comicID}) => comicID.toString()}
        horizontal={true}
        ItemSeparatorComponent={itemSeparator}
        renderItem={({item}) => {
          const imageURL = `${item.thumbnail.path}.${item.thumbnail.extension}?apikey=${credentials.apikey}&ts=${credentials.ts}&hash=${credentials.hash}`;
          return (
            <View>
              <Image
                style={[styles.profilePicture]}
                width={200}
                height={307}
                source={{
                  uri: imageURL,
                }}
              />
              <Text style={styles.comicTitle}>{item.title}</Text>
            </View>
          );
        }}
      />
      {}
    </View>
  );
};

export default CharacterPage;
