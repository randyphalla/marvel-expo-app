import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function SectionTitle({ title, children }) {
  return (
    <View style={styles.characterItem}>
      <Text style={styles.characterItemTitle}>{ title }</Text>
      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  characterItem: {
    marginTop: 6,
    marginBottom: 6,
  },
  characterItemTitle: {
    color: '#202020',
    marginBottom: 6,
    fontSize: 24,
    fontWeight: '800'
  },
});