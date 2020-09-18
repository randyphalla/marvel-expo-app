import React, { FC } from 'react';
import { 
  Text, 
  TouchableOpacity,
  StyleSheet 
} from 'react-native';

type HomeCardProps = {
  text?: string;
  onPress?: () => void;
  color?: string;
  image?: string;
}

const HomeCard: FC<HomeCardProps> = (props: HomeCardProps) => {
  return (
    <TouchableOpacity style={{...styles.HomeButton, backgroundColor: props.color}} onPress={props.onPress}>
      <Text style={styles.HomeButtonText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

HomeCard.defaultProps = {
  text: 'Home Card Title',
  color: '#000000'
}

const styles = StyleSheet.create({
  HomeButton: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,  
    marginBottom: 10,
    width: '100%',
    borderRadius: 8
  },
  HomeButtonText: {
    marginTop: 60,
    color: '#ffffff',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.3
  }
});

export default HomeCard;