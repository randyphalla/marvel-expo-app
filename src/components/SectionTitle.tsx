import React, { FC, ReactNode } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export type SectionTitleProps = {
  title?: string;
  children?: ReactNode | string;
};

const SectionTitle: FC<SectionTitleProps> = (props: SectionTitleProps) => {
  return (
    <View style={styles.characterItem}>
      <Text style={styles.characterItemTitle}>{ props.title }</Text>
      { props.children }
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

export default SectionTitle;