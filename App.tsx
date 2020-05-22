import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { privateKey } from './src/shared/apiKey';
import Characters from './src/Characters/Characters';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Marvel Expo App</Text>
      <Text>{ privateKey }</Text>
      <Characters></Characters>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
