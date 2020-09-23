import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

const Story = ({navigation, route}: any) => {
  const story = route?.params.data;
  console.log(story);

  const [characters, setCharacters] = useState([]);
  const [charactersLoading, setCharactersLoading] = useState<boolean>(true);

  const [comics, setComics] = useState([]);
  const [comicsLoading, setComicsLoading] = useState<boolean>(true);

  const [creators, setCreators] = useState([]);
  const [creatorsLoading, setCreatorsLoading] = useState<boolean>(true);

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);

  const [series, setSeries] = useState([]);
  const [seriesLoading, setSeriesLoading] = useState<boolean>(true);

  useEffect(() => {
    return () => {}
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          <Text>{story.title}</Text>
          <Text>{story.description}</Text>
          <Text>{story.modified}</Text>
          <Text>{story.originalIssue.name}</Text>
          <Text>{story.originalIssue.resourceURI}</Text>
          <Text>{story.thumbnail}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default Story;