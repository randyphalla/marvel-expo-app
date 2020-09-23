import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function Creator({navigation, route}: any) {
  
  const creator = route?.params.data;
  console.log(creator);

  const [comics, setComics] = useState([]);
  const [comicsLoading, setComicsLoading] = useState<boolean>(true);

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);

  const [series, setSeries] = useState([]);
  const [seriesLoading, setSeriesLoading] = useState<boolean>(true);

  const [stories, setStories] = useState([]);
  const [storiesLoading, setStoriesLoading] = useState<boolean>(true);

  useEffect(() => {
    return () => {}
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          <Text>{creator.fullName}</Text>
          <Text>{creator.modified}</Text>
          <Text>{creator.resourceURI}</Text>
          <Text>{creator.thumbnail.path} {creator.thumbnail.extension}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}