import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SearchPage from '../pages/Search/SearchPage';
import CharacterPage from '../pages/Character/CharacterPage';
import ComicPage from '../pages/Comic/ComicPage';
import { characterData, Comic } from '../services/api/apiTypes';

export type NavigationParams = {
  Search?: undefined;
  Character: { character: characterData };
  Comic: { comic: Comic };
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Character"
        component={CharacterPage}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Comic"
        component={ComicPage}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default App;
