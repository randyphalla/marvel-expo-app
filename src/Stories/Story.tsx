import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function Story({navigation, route}: any) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          <Text>Story</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}