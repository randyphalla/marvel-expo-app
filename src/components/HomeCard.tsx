import React, { FC } from 'react';
// import { Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import styled from 'styled-components/native';

type HomeCardProps = {
  text?: string;
  image?: string;
  onPress?: () => void;
}

const HomeButton = styled.TouchableOpacity`
  margin-bottom: 10px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const HomeButtonText = styled.Text`
  margin-top: 60px;
  color: #ffffff;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.3px;
`;

const HomeButtonImageBackground = styled.ImageBackground`
  padding: 16px;
`;

const HomeCard: FC<HomeCardProps> = (props: HomeCardProps) => {
  return (
    <HomeButton onPress={props.onPress}>
      <HomeButtonImageBackground source={{uri: props.image}} resizeMode="cover">
        <HomeButtonText>{props.text}</HomeButtonText>
      </HomeButtonImageBackground>
    </HomeButton>
  )
}

HomeCard.defaultProps = {
  text: 'Home Card Title',
  image: 'https://vignette.wikia.nocookie.net/marveldatabase/images/0/0a/Iron_Man_Vol_6_1_Brooks_Variant_Textless.jpg/revision/latest?cb=20200731223104'
}

export default HomeCard;