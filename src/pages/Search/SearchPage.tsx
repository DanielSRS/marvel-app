import React, {useState} from 'react';
import {FlatList, Image, ListRenderItemInfo, Text, View} from 'react-native';

import styles from './SerachPageStyles';
import {characterData, charactersProps} from '../../services/api/apiTypes';
import {getAuthCredentials, getCharacterByName} from '../../services/api/api';
import Searchbar from '../../components/Searchbar/Searchbar';

const SearchPage = () => {
  const [data, setData] = useState<charactersProps>();

  const search = async (name: string) => {
    const res = await getCharacterByName({name});
    if (res.error) {
      console.log('SearchPage: search error: ' + res.error);
      return;
    }
    setData(res.response);
  };

  return (
    <PageContainer>
      <Searchbar onSubmitEditing={search} />
      <ResultList data={data} />
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

const searchResultItem = ({item}: ListRenderItemInfo<characterData>) => {
  const credentials = getAuthCredentials();

  return (
    <View>
      <Text>{item.name}</Text>
      <Image
        style={styles.characterCard}
        width={150}
        source={{
          uri: `${item.thumbnail.path}.${item.thumbnail.extension}?apikey=${credentials.apikey}&ts=${credentials.ts}&hash=${credentials.hash}`,
        }}
      />
    </View>
  );
};

const ResultList = ({data}: any) => {
  return (
    <FlatList
      style={styles.flatlist}
      data={data?.data.results}
      keyExtractor={({id}) => id.toString()}
      ListEmptyComponent={NoResultes}
      renderItem={searchResultItem}
    />
  );
};

const PageContainer: React.FC = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default SearchPage;
