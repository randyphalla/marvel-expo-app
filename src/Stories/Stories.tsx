import md5 from 'md5';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { StoriesModel } from '../models/StoriesModel';
import { privateKey, publicKey } from '../shared/apiKey';

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

  console.log(stories);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          {
            stories.map((story, index) => 
              <TouchableOpacity
                key={index}
                onPress={() => goToStoryPage(story)}
              >
                <Text>{story.title}</Text>
                <Text>{story.description}</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Stories;
