import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import styles from './SearchbarStyles';

const Searchbar = ({
  onSubmitEditing = (searchText: string) => {
    searchText.trim();
  },
}) => {
  const [text, setText] = useState('');

  return (
    <View style={styles.contaier}>
      <TextInput
        style={styles.input}
        placeholder="Busca"
        value={text}
        onSubmitEditing={() => {
          onSubmitEditing(text.toLowerCase());
        }}
        onChangeText={newText => {
          setText(newText);
        }}
      />
      {}
      {}
    </View>
  );
};

export default Searchbar;
