import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Pages
import Series from './Series/Series';
import Home from './views/Home/Home';
import Characters from './views/Characters/Characters';
import Character from './views/Characters/Character';
import Comic from './views/Comics/Comic';
import Comics from './views/Comics/Comics';
import Creator from './views/Creators/Creator';
import Creators from './views/Creators/Creators';
import Event from './views/Events/Event';
import Events from './views/Events/Events';
import Serie from './views/Series/Serie';
import Series from './views/Series/Series';
import Stories from './views/Stories/Stories';
import Story from './views/Stories/Story';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />

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