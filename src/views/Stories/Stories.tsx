import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import md5 from 'md5';

import { StoriesModel } from '../../models/StoriesModel';
import { privateKey, publicKey } from '../../shared/apiKey';
import { blackColor, whiteColor } from '../../styles';

const Stories = ({navigation}: any) => {
  const [stories, setStories] = useState<StoriesModel[]>([]);
  const [storiesLoading, setStoriesLoading] = useState<boolean>(false);

  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/stories';
  const url = `${baseUrl}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;

  const getStories = async () => { 
    try {
      let res = await fetch(url);
      let json = await res.json();

      if (json && json.data && json.data.results) {
        setStories(json.data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setStoriesLoading(true);
    }
  }

  const goToStoryPage = (story: StoriesModel) => navigation.navigate('Story', {data: story});

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.StoriesTouchableOpacity}
      onPress={() => goToStoryPage(item)}
    >
      <Text style={styles.StoriesTitle}>{item.title}</Text>
      <Text style={styles.StoriesOriginalIssue}>{item?.originalIssue?.name}</Text>
    </TouchableOpacity>
  );

  const renderStories = () => {
    if (stories && storiesLoading) {
      return (
        <FlatList 
          data={stories}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )
    } else {
      return (
        <Text>Stories is loading</Text>
      )
    }
  }


  useEffect(() => {
    getStories();

    return () => {
      setStories([]);
      setStoriesLoading(true);
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={{padding: 13}}>
        {renderStories()}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  StoriesTouchableOpacity: {
    padding: 13,
    marginBottom: 8,
    backgroundColor: whiteColor,
    borderRadius: 8
  },
  StoriesTitle: {
    marginBottom: 8,
    color: blackColor,
    fontSize: 16,
    fontWeight: "800",
  },
  StoriesOriginalIssue: {
    color: blackColor,
    fontSize: 12,
    fontWeight: "500",
  }
});

export default Stories;
