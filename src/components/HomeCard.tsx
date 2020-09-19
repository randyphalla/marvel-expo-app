import React, { FC } from 'react';
import { Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

type HomeCardProps = {
  text?: string;
  image?: string;
  onPress?: () => void;
}

const HomeCard: FC<HomeCardProps> = (props: HomeCardProps) => {
  return (
    <TouchableOpacity 
      style={{...styles.HomeButton}} 
      onPress={props.onPress}
    >
      <ImageBackground 
        source={{uri: props.image}} 
        style={styles.ImageBackground}
        resizeMode="cover"
      >
        <Text style={styles.HomeButtonText}>{props.text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

HomeCard.defaultProps = {
  text: 'Home Card Title',
  image: 'https://vignette.wikia.nocookie.net/marveldatabase/images/0/0a/Iron_Man_Vol_6_1_Brooks_Variant_Textless.jpg/revision/latest?cb=20200731223104'
}

const styles = StyleSheet.create({
  HomeButton: {
    marginBottom: 10,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden'
  },
  HomeButtonText: {
    marginTop: 60,
    color: '#ffffff',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.3
  },
  ImageBackground: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  }
});

export default HomeCard;