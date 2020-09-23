import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export type LinkProps = {
  text?: string;
  onPress?: () => void;
}

const Link: FC<LinkProps> = (props: LinkProps) => {
  return (
    <TouchableOpacity 
      style={styles.LinkTouchableOpacity} 
      onPress={props.onPress}
    >
      <Text style={styles.LinkText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  LinkTouchableOpacity: {
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: 3,
    marginBottom: 3
  },
  LinkText: {
    color: '#202020',
    fontSize: 14,
    fontWeight: '400'
  },
});

export default Link;
