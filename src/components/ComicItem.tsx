import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

export type ComicItemProps = {
  path?: string;
  extension?: string;
  title?: string;
  pressEvent?: () => void;
};

export default function ComicItem({path, extension, title, pressEvent}: ComicItemProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.characterItemButton, 
        styles.characterItemImageButton
      ]} 
      onPress={pressEvent}
    >
      <Image 
        style={styles.characterItemImage}
        source={{ uri: path + '.' + extension }} 
        resizeMode="contain"
      />
      <Text 
        style={[
          styles.characterItemText, 
          styles.characterItemTitleWithImage
        ]}
      >
        { title }
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  characterItemImage: {
    width: '100%',
    height: 250
  },
  characterItemTitle: {
    color: '#202020',
    marginBottom: 6,
    fontSize: 24,
    fontWeight: '800'
  },
  characterItemTitleWithImage: {
    marginTop: 10,
    marginLeft: 6
  },
  characterItemButton: {
    padding: 6,
    marginTop: 3,
    marginBottom: 3
  },
  characterItemImageButton: { width: '49%' },
  characterItemText: {
    color: '#202020',
    fontSize: 14,
    fontWeight: '400'
  },
});