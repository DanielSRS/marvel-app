import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './SerachPageStyles';
import { characterData, charactersProps } from '../../services/api/apiTypes';
import { getAuthCredentials, getCharacterByName } from '../../services/api/api';
import Searchbar from '../../components/Searchbar/Searchbar';

import { StackScreenProps } from '@react-navigation/stack';
import { NavigationParams } from '../../routes';

type Props = StackScreenProps<NavigationParams, 'Search'>;

type NavigationProp = Props['navigation'];

const SearchPage = ({ navigation }: Props) => {
  const [data, setData] = useState<charactersProps>();

  const search = async (nameStartsWith: string) => {
    const res = await getCharacterByName({ nameStartsWith });
    if (res.error) {
      console.log('SearchPage: search error: ');
      console.log(res.error);
      return;
    }
    setData(res.response);
  };

  return (
    <PageContainer>
      <Searchbar onSubmitEditing={search} />
      <ResultList data={data} navigation={navigation} />
    </PageContainer>
  );
};

const NoResultes = () => {
  return (
    <View>
      {}
      <Text>Sem resultados</Text>
      {}
    </View>
  );
};

const SearchResultItem = ({
  item,
  navigation,
}: ListRenderItemInfo<characterData> & { navigation: NavigationProp }) => {
  const credentials = getAuthCredentials();

  const imageClick = () => {
    navigation.navigate('Character', { character: item });
  };

  const imageURL = `${item.thumbnail.path}.${item.thumbnail.extension}?apikey=${credentials.apikey}&ts=${credentials.ts}&hash=${credentials.hash}`;

  return (
    <View>
      <Text>{item.name}</Text>
      <TouchableOpacity onPress={imageClick}>
        <Image
          style={styles.characterCard}
          width={150}
          source={{
            uri: imageURL,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

type resultListParams = {
  data: charactersProps | undefined;
  navigation: NavigationProp;
};

const ResultList = ({ data, navigation }: resultListParams) => {
  return (
    <FlatList
      style={styles.flatlist}
      data={data?.data.results}
      keyExtractor={({ id }) => id.toString()}
      ListEmptyComponent={NoResultes}
      renderItem={({ item, index, separators }) => {
        return (
          <SearchResultItem
            item={item}
            index={index}
            separators={separators}
            navigation={navigation}
          />
        );
      }}
    />
  );
};

const PageContainer: React.FC = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default SearchPage;
