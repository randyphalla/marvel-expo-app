import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import md5 from 'md5';

import { StoriesModel } from '../models/StoriesModel';
import { privateKey, publicKey } from '../shared/apiKey';
import { blackColor, whiteColor } from '../styles';

const Stories = ({navigation}: any) => {
  const [stories, setStories] = useState<StoriesModel[]>([]);
  const [isStoriesLoading, setStoriesLoading] = useState<boolean>(true);

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
      setStoriesLoading(false);
    }
  }

  const goToStoryPage = (story: StoriesModel) => navigation.navigate('Story', {data: story});

  useEffect(() => {
    getStories();

    return () => {
      setStories([]);
      setStoriesLoading(true);
    }
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          {
            stories.map((story, index) => 
              <TouchableOpacity
                key={index}
                style={styles.StoriesTouchableOpacity}
                onPress={() => goToStoryPage(story)}
              >
                <Text style={styles.StoriesTitle}>{story.title}</Text>
                <Text style={styles.StoriesOriginalIssue}>{story?.originalIssue?.name}</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </ScrollView>
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
