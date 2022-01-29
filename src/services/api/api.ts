import {privateKey, publicKey} from '../../../apiKeys';
import md5 from 'md5';

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

export const baseUrl = 'http(s)://gateway.marvel.com/';
