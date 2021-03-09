import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Location from './stacks/locationStack';
import Saved from './stacks/savedStack';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#12486f',
          inactiveTintColor: 'grey',
          style: { height: '10%' },
          tabStyle: {
            borderTopColor: '#12486f',
            borderTopWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          },
          labelStyle: {
            paddingBottom: 5,
          },
        }}
      >
        <Tab.Screen
          name="Loaction"
          component={Location}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="enviroment" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Saved"
          component={Saved}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="bars" size={30} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
