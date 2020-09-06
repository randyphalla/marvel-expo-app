import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export type BannerInfoProps = {
  name?: string;
  description?: string;
}

export default function BannerInfo({name, description}: BannerInfoProps) {
  return (
    <View style={styles.characterInfo}>
      <Text style={styles.characterText}>{ name }</Text>
      {
        description ? (
          <Text style={styles.characterDescriptionText}>{ description }</Text>
        ) : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  characterInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: -30,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  characterText: {
    color: '#202020',
    fontSize: 20,
    fontWeight: '800'
  },
  characterDescriptionText: {
    marginTop: 12,
    color: '#202020',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 18
  },
});

BannerInfo.defaultProps = {
  name: 'Banner name',
  description: 'Banner description'
};