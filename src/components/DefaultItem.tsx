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
        <Text style={styles.characterItemText}>{props.name}</Text>
        {props.description ? (
          <View style={styles.characterItemDesc}>
            <Text style={styles.characterItemDescText} numberOfLines={4}>
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
    paddingTop: 10,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E2F3",
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
  characterItemText: {
    color: "#060606",
    fontSize: 16,
    fontWeight: "800",
  },
  characterItemDesc: {},
  characterItemDescText: {
    marginTop: 6,
    color: "#060606",
    fontSize: 12,
    fontWeight: "400",
  },
});

export default DefaultItem;
