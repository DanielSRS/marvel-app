import React from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import ComicHelper, { ComicPageProps } from './ComicHelper';
import styles from './ComicStyles';
import { ComicCreatorsItem } from '../../services/api/apiTypes';
import { StyleSheet } from 'react-native';

const ComicPage = (props: ComicPageProps) => {
  const { comic, comicCoverImageURL } = ComicHelper(props);

  return (
    <PageBackground comicCoverImageURL={comicCoverImageURL}>
      <ScrollView style={styles.scroll}>
        <Cover comicCoverImageURL={comicCoverImageURL} />

        {/* Titulo */}
        <Text style={styles.comicTitle}>{comic.title}</Text>

        {/* Descrição */}
        <Text style={styles.comicDescription}>{comic.description}</Text>

        {/* Criadores */}
        <Creators creators={comic.creators.items} />
      </ScrollView>
    </PageBackground>
  );
};

const PageBackground: React.FunctionComponent<{
  comicCoverImageURL: string;
}> = ({ comicCoverImageURL, children }) => {
  const headerHeight = useHeaderHeight();
  return (
    <ImageBackground
      style={[
        styles.container,
        { marginTop: -headerHeight, paddingTop: headerHeight },
      ]}
      blurRadius={50}
      fadeDuration={200}
      imageStyle={styles.imageBackground}
      source={{ uri: comicCoverImageURL }}>
      {children}
    </ImageBackground>
  );
};

const Cover = ({ comicCoverImageURL }: { comicCoverImageURL: string }) => {
  return (
    <Image
      style={[styles.comicCover, { aspectRatio: 553 / 850 }]}
      source={{ uri: comicCoverImageURL }}
    />
  );
};

const Creators = ({ creators }: { creators: [ComicCreatorsItem] }) => {
  const creatorStyles = StyleSheet.create({
    container: {
      paddingTop: 10,
    },
    sectionTitle: {
      fontSize: 18,
      paddingVertical: 6,
    },
    creatorsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  const creatorList = [];
  for (let index = 0; index < creators.length; index++) {
    const creatorItem = <Creator creator={creators[index]} />;
    creatorList.push(<View key={index}>{creatorItem}</View>);
  }

  return (
    <View style={creatorStyles.container}>
      <Text style={creatorStyles.sectionTitle}>{'Creators: '}</Text>
      <View style={creatorStyles.creatorsContainer}>{creatorList}</View>
    </View>
  );
};

const Creator = ({ creator }: { creator: ComicCreatorsItem }) => {
  const creatorStyles = StyleSheet.create({
    container: {
      padding: 10,
      borderWidth: 1,
      borderColor: 'transparent',
      width: Dimensions.get('window').width / 2 - 20,
    },
    role: {
      fontSize: 15,
    },
  });

  const role = creator.role.toUpperCase();
  const name = creator.name;

  return (
    <View style={creatorStyles.container}>
      <Text style={creatorStyles.role}>{role}</Text>
      <Text>{name}</Text>
    </View>
  );
};

export default ComicPage;
