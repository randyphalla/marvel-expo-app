import React, { FC } from 'react';
import styled from 'styled-components/native';

export type LinkProps = {
  text?: string;
  onPress?: () => void;
}

const LinkTouchableOpacity = styled.TouchableOpacity`
  padding-top: 3px;
  padding-bottom: 3px;
  margin-top: 3px;
  margin-bottom: 3px;
`;

const LinkText = styled.Text`
  color: #202020;
  font-size: 14px;
  font-weight: 400;
`;

const Link: FC<LinkProps> = (props: LinkProps) => {
  return (
    <LinkTouchableOpacity onPress={props.onPress}>
      <LinkText>{props.text}</LinkText>
    </LinkTouchableOpacity>
  )
}

export default Link;
