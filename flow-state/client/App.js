import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './screens/map';
import Flow from './screens/flow';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Flow" component={Flow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
