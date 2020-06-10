import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Characters from './Characters/Characters';
import Character from './Characters/Character';
import Comic from './Comics/Comic';
import Comics from './Comics/Comics';
import Creator from './Creators/Creator';
import Creators from './Creators/Creators';
import Event from './Events/Event';
import Events from './Events/Events';
import Serie from './Series/Serie';
import Series from './Series/Series';
import Stories from './Stories/Stories';
import Story from './Stories/Story';

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          
        <Stack.Screen name="Characters" component={Characters} />
        <Stack.Screen name="Character" component={Character} />

        <Stack.Screen name="Comic" component={Comic} />
        <Stack.Screen name="Comics" component={Comics} />

        <Stack.Screen name="Creator" component={Creator} />
        <Stack.Screen name="Creators" component={Creators} />

        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="Event" component={Event} />

        <Stack.Screen name="Serie" component={Serie} />
        <Stack.Screen name="Series" component={Series} />

        <Stack.Screen name="Stories" component={Stories} />
        <Stack.Screen name="Story" component={Story} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation;