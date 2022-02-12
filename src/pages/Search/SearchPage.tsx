import React, { useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import styles from './SerachPageStyles';
import { characterData, charactersProps } from '../../services/api/apiTypes';
import { getAuthCredentials, getCharacterByName } from '../../services/api/api';
import Searchbar from '../../components/Searchbar/Searchbar';

import { StackScreenProps } from '@react-navigation/stack';
import { NavigationParams } from '../../routes';
import FastImage from 'react-native-fast-image';

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
  index,
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
        <FastImage
          style={styles.characterCard}
          source={{
            uri: imageURL,
            priority:
              index === 1 ? FastImage.priority.high : FastImage.priority.normal,
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
      ListFooterComponent={FooterComponent}
    />
  );
};

const PageContainer: React.FC = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const FooterComponent = () => {
  return <View style={styles.footer} />;
};

export default SearchPage;
