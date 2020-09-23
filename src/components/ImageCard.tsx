import React, { FC } from 'react';
import styled from 'styled-components/native';

type ImageCardProps = {
  text?: string;
  path?: string;
  extension?: string;
  onPress?: () => void;
}

const CharacterItem = styled.TouchableOpacity`
  margin-bottom: 16px;
  width: 48%;
`;

const CharacterItemImage = styled.Image`
  width: 100%;
  height: 170px;
  margin-bottom: 8px;
  border-radius: 8px;
`;

const CharacterItemImageLoading = styled.View`
  width: 100%;
  height: 170px;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: red;
`;

const CharacterItemText = styled.Text`
  color: #202020;
  font-size: 14px;
  font-weight: 400;
`;

const ImageCard: FC<ImageCardProps> = (props: ImageCardProps) => {
  return (
    <CharacterItem 
      onPress={props.onPress}
    >
      {
        props.path && props.extension ? (
          <CharacterItemImage 
            source={{uri: props.path + '.' + props.extension}} 
            resizeMode="cover"
          />
        ) : (
          <CharacterItemImageLoading></CharacterItemImageLoading>
        )
      }
      <CharacterItemText>{props.text}</CharacterItemText>
    </CharacterItem>
  )
};

export default ImageCard;