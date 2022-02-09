import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SearchPage from '../pages/Search/SearchPage';
import CharacterPage from '../pages/Character/CharacterPage';

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
    </Stack.Navigator>
  );
};

export default App;
