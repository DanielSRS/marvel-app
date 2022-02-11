import { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { NavigationParams } from '../../routes';
import { getAuthCredentials } from '../../services/api/api';
import { Comic } from '../../services/api/apiTypes';

export type ComicPageProps = StackScreenProps<NavigationParams, 'Comic'>;

const ComicHelper = ({ route, navigation }: ComicPageProps) => {
  const routeParamsComic = route.params.comic;
  const [comic, setComic] = useState<Comic>(routeParamsComic);
  const credentials = getAuthCredentials();

  useEffect(() => {
    navigation.setOptions({
      title: comic.title,
    });

    return () => {
      // on unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const comicCoverImageURL = `${comic.thumbnail.path}.${comic.thumbnail.extension}?apikey=${credentials.apikey}&ts=${credentials.ts}&hash=${credentials.hash}`;

  return {
    comic,
    setComic,
    comicCoverImageURL,
  };
};

export default ComicHelper;
