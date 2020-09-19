import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function Event({navigation, route}: any) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          <Text>Event</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}