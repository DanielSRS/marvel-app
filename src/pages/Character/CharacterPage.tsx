import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ComicDataWrapper } from '../../services/api/apiTypes';
import { StackScreenProps } from '@react-navigation/stack';
import styles from './CharacterStyles';
import {
  credentialsProps,
  getAuthCredentials,
  getComicsByCharacterID,
} from '../../services/api/api';
import { NavigationParams } from '../../routes';
import FastImage from 'react-native-fast-image';

type Props = StackScreenProps<NavigationParams, 'Character'>;

type comicPageParams = StackScreenProps<
  NavigationParams,
  'Comic'
>['route']['params'];

const CharacterPage = ({ route, navigation }: Props) => {
  const character = route.params.character;

  if (!character) {
    navigation.goBack();
  }

  useEffect(() => {
    navigation.setOptions({ title: character.name });
  }, [character, navigation]);

  const credentials = getAuthCredentials();

  const imageURL = `${character.thumbnail.path}.${character.thumbnail.extension}?apikey=${credentials.apikey}&ts=${credentials.ts}&hash=${credentials.hash}`;

  const onComicClick = (params: comicPageParams) => {
    navigation.navigate('Comic', {
      comic: params.comic,
    });
  };

  return (
    <ScrollView>
      <View>
        <View style={[styles.card, styles.profileCard]}>
          <View style={styles.pictureContainer}>
            <FastImage
              style={styles.profilePicture}
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
        <CharacterComics
          id={character.id}
          credentials={credentials}
          onPress={onComicClick}
        />
      </View>
    </ScrollView>
  );
};

const CharacterComics = ({
  id,
  credentials,
  onPress = () => {},
}: {
  id: number;
  credentials: credentialsProps;
  onPress?: (params: comicPageParams) => void;
}) => {
  const [comicData, setComicData] = useState<ComicDataWrapper>();

  const searchComics = useCallback(
    async (characterId = id) => {
      const res = await getComicsByCharacterID({ characterId });
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
        keyExtractor={({ id: comicID }) => comicID.toString()}
        horizontal={true}
        ItemSeparatorComponent={itemSeparator}
        renderItem={({ item, index }) => {
          const imageURL = `${item.thumbnail.path}.${item.thumbnail.extension}?apikey=${credentials.apikey}&ts=${credentials.ts}&hash=${credentials.hash}`;
          const handleClick = () => {
            onPress({ comic: item });
          };

          return (
            <TouchableOpacity onPress={handleClick}>
              <FastImage
                style={[styles.profilePicture, { width: 200, height: 307 }]}
                source={{
                  uri: imageURL,
                  priority:
                    index === 1
                      ? FastImage.priority.high
                      : FastImage.priority.normal,
                }}
              />
              <Text style={styles.comicTitle}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
      {}
    </View>
  );
};

export default CharacterPage;
