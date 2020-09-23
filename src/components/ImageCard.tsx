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
      <CharacterItemImage 
        source={{uri: props.path + '.' + props.extension}} 
        resizeMode="cover"
      />
      <CharacterItemText>{props.text}</CharacterItemText>
    </CharacterItem>
  )
};

export default ImageCard;