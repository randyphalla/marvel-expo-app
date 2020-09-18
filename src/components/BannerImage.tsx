import React, { FC } from 'react';
import { StyleSheet, View, Image, } from 'react-native';

export type BannerImageProps = {
  path?: string;
  extension?: string;
  isComic?: boolean;
}

const BannerImage: FC<BannerImageProps> = (props: BannerImageProps) => {
  return (
    <View style={styles.characterImageContainer}>
      <Image 
        style={props.isComic ? styles.characterImageComic : styles.characterImage}
        source={{uri: props.path + '.' + props.extension}} 
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

BannerImage.defaultProps = {
  path: '',
  extension: ''
};

export default BannerImage;