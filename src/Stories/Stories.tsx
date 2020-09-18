import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function Stories({navigation, route}: any) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          <Text>Stories</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}