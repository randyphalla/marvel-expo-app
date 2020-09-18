import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

export type ComicItemProps = {
  path?: string;
  extension?: string;
  title?: string;
  pressEvent?: () => void;
};

const ComicItem: FC<ComicItemProps> = (props: ComicItemProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.characterItemButton, 
        styles.characterItemImageButton
      ]} 
      onPress={props.pressEvent}
    >
      <Image 
        style={styles.characterItemImage}
        source={{ uri: props.path + '.' + props.extension }} 
        resizeMode="contain"
      />
      <Text 
        style={[
          styles.characterItemText, 
          styles.characterItemTitleWithImage
        ]}
      >
        { props.title }
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

ComicItem.defaultProps = {
  path: '',
  extension: '',
  title: ''
};

export default ComicItem;