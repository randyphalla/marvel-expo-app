import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function Serie({navigation, route}: any) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          <Text>Serie</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}