import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import Map from '../screens/map';
import Flow from '../screens/flow';

const Stack = createStackNavigator();

const LocationTab: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Map"
      component={Map}
      options={{ headerTransparent: true, title: '' }}
    />
    <Stack.Screen
      name="Flow"
      component={Flow}
      options={{
        title: 'Flow State',
        headerTitleStyle: { color: '#12486f' },
        headerBackImage: () => (
          <AntDesign name="left" size={30} color="#12486f" />
        ),
        headerBackTitleVisible: false,
        headerStyle: { borderBottomColor: '#12486f', borderBottomWidth: 2 },
      }}
    />
  </Stack.Navigator>
);

export default LocationTab;
