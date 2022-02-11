import React from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import { Dimensions, Image, ImageBackground, Text, View } from 'react-native';
import ComicHelper, { ComicPageProps } from './ComicHelper';
import styles from './ComicStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const WINDOW_WIDTH = Dimensions.get('screen').width;
const WINDOW_HEIGHT = Dimensions.get('screen').height;

const ComicPage = (props: ComicPageProps) => {
  const { comic, comicCoverImageURL } = ComicHelper(props);
  const headerHeight = useHeaderHeight();

  return (
    <ImageBackground
      style={[
        styles.container,
        { marginTop: -headerHeight, paddingTop: headerHeight + 30 },
      ]}
      blurRadius={50}
      fadeDuration={200}
      imageStyle={styles.imageBackground}
      source={{ uri: comicCoverImageURL }}>
      <View>
        <Image
          style={[styles.comicCover, { aspectRatio: 553 / 850 }]}
          source={{ uri: comicCoverImageURL }}
        />
        <Text>{comic.title}</Text>
        <Text>{comic.description}</Text>
        {}
        {}
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: '#0000007F',
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
          paddingHorizontal: 20,
          paddingTop: headerHeight + 30,
          display: 'none',
        }}>
        <Image
          style={[{ width: '100%' }, { aspectRatio: 553 / 850 }]}
          source={{ uri: comicCoverImageURL }}
        />
        {}
        {}
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default ComicPage;
