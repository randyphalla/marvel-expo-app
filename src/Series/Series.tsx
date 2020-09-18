import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function Series({navigation, route}: any) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          <Text>Series</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}