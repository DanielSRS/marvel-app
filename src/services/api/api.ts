import {privateKey, publicKey} from '../../../apiKeys';
import md5 from 'md5';
import axios from 'axios';
import {charactersProps, charactersParams} from './apiTypes';

interface credentialsProps {
  apikey: string;
  ts: string;
  hash: string;
}

export const getAuthCredentials = (): credentialsProps => {
  const timestamp = Date.now();
  const hash = md5(timestamp + privateKey + publicKey);
  return {
    apikey: publicKey,
    ts: timestamp.toString(),
    hash,
  };
};

export const baseUrl = 'https://gateway.marvel.com';

interface getCharactersResponse {
  sucess: Boolean;
  response?: charactersProps;
  error?: any;
}

export const getCharacters = async (
  params: charactersParams,
): Promise<getCharactersResponse> => {
  const credentials = getAuthCredentials();
  return axios
    .get<charactersProps>(`${baseUrl}/v1/public/characters`, {
      params: {
        ...credentials,
        ...params,
      },
    })
    .then(res => {
      return {
        sucess: true,
        response: res.data,
      };
    })
    .catch(error => {
      return {
        sucess: false,
        error: error,
      };
    });
};

export const getCharacterByName = async (
  params: charactersParams,
): Promise<getCharactersResponse> => {
  const credentials = getAuthCredentials();
  return axios
    .get<charactersProps>(`${baseUrl}/v1/public/characters`, {
      params: {
        ...credentials,
        ...params,
      },
    })
    .then(res => {
      return {
        sucess: true,
        response: res.data,
      };
    })
    .catch(error => {
      return {
        sucess: false,
        error: error,
      };
    });
};
