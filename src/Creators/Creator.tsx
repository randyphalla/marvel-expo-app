import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function Creator({navigation, route}: any) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          <Text>Creator</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}