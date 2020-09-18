import React, { ReactNode } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export type SectionTitleProps = {
  title?: string;
  children?: ReactNode | string;
};

export default function SectionTitle({ title, children }: SectionTitleProps) {
  return (
    <View style={styles.characterItem}>
      <Text style={styles.characterItemTitle}>{ title }</Text>
      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  characterItem: {
    marginBottom: 16
  },
  characterItemTitle: {
    marginBottom: 6,
    fontSize: 20,
    fontWeight: '800'
  },
});

SectionTitle.defaultProps = {
  title: 'Your section title'
};