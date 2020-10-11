import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { blackColor, whiteColor } from '../styles';

export type BannerInfoProps = {
  name?: string;
  description?: string;
}

const BannerInfo: FC<BannerInfoProps> = (props: BannerInfoProps) => {
  return (
    <View style={styles.characterInfo}>
      <Text style={styles.characterText}>{ props.name }</Text>
      {
        props.description ? (
          <Text style={styles.characterDescriptionText}>{ props.description }</Text>
        ) : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  characterInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: -30,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
    borderRadius: 10,
    backgroundColor: whiteColor,
    shadowColor: blackColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  characterText: {
    color: blackColor,
    fontSize: 20,
    fontWeight: '800'
  },
  characterDescriptionText: {
    marginTop: 12,
    color: blackColor,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 18
  },
});

BannerInfo.defaultProps = {
  name: 'Banner name'
};

export default BannerInfo;