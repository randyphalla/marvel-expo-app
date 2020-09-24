import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from 'react-native';

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

  const getCharacters = () => console.log('Get Characters');
  const getComics = () => console.log('Get Comics ');
  const getCreators = () => console.log('Get Creators');
  const getEvents = () => console.log('Get Events');
  const getSeries = () => console.log('Get Series');

  useEffect(() => {
    getCharacters();
    getComics();
    getCreators();
    getEvents();
    getSeries();
    
    return () => {
      setCharactersLoading(false);
      setComicsLoading(false);
      setCreatorsLoading(false);
      setEventsLoading(false);
      setSeriesLoading(false);
    }
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          <Text>{story.title}</Text>
          <Text>{story.modified}</Text>
          {
            story && story.originalIssue ? (
              <>
                <Text>{story.originalIssue.name}</Text>
                <Text>{story.originalIssue.resourceURI}</Text>
              </>
            ) : null
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  StoryTitle: {},
  StoryModified: {},
  StoryOriginalIssueName: {}
});

export default Story;