import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export type DefaultItemProps = {
  path?: string;
  extension?: string;
  name?: string;
  description?: string;
  onPress?: () => void;
}

const DefaultItem = (props: DefaultItemProps) => {
  return (
    <TouchableOpacity 
      style={styles.characterItem} 
      onPress={props.onPress}
    >
      <Image
        style={styles.characterItemImage}
        source={{ uri: props.path + "." + props.extension }}
        resizeMode="cover"
      />
      <View style={styles.characterItemContent}>
        <View>
          <Text style={styles.CharacterItemText}>{props.name}</Text>
        </View>
        {props.description ? (
          <View>
            <Text 
              style={styles.characterItemDescText} 
              numberOfLines={4}
            >
              {props.description}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  characterItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 13,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  characterItemImage: {
    height: 80,
    width: 100,
    marginRight: 10,
    borderRadius: 6,
  },
  characterItemContent: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  CharacterItemText: {
    color: "#060606",
    fontSize: 16,
    fontWeight: "800",
  },
  characterItemDescText: {
    marginTop: 6,
    color: "#060606",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18
  },
});

export default DefaultItem;
