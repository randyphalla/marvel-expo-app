import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

export default function Story({navigation, route}: any) {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Story</Text>
      </ScrollView>
    </SafeAreaView>
  )
}