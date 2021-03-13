import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Saved from '../screens/saved';

const Stack = createStackNavigator();

const SavedStack: React.FC = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Saved"
        component={Saved}
        options={{
          headerStyle: { borderBottomColor: '#12486f', borderBottomWidth: 2 },
          headerTitleStyle: { color: '#12486f' },
        }}
      />
    </Stack.Navigator>
  );

export default SavedStack;
