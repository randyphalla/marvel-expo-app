import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function Creators({navigation, route}) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          <Text>Creators</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}