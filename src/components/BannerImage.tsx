import React from 'react';
import { StyleSheet, View, Image, } from 'react-native';

export default function BannerImage({path, extension, isComic}) {
  console.log(path);
  console.log(extension);
  return (
    <View style={styles.characterImageContainer}>
      <Image 
        style={isComic ? styles.characterImageComic : styles.characterImage}
        source={{uri: path + '.' + extension}} 
        resizeMode="cover"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  characterImageContainer: {},
  characterImage: {
    width: '100%',
    height: 350
  },
  characterImageComic: {
    width: '100%',
    height: 635
  }
});