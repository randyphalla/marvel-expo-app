import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

const Serie = ({navigation, route}: any) => {
  const serie = route?.params.data;
  console.log(serie);

  const [characters, setCharacters] = useState([]);
  const [charactersLoading, setCharactersLoading] = useState<boolean>(true);

  const [comics, setComics] = useState([]);
  const [comicsLoading, setComicsLoading] = useState<boolean>(true);

  const [creators, setCreators] = useState([]);
  const [creatorsLoading, setCreatorsLoading] = useState<boolean>(true);

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);

  const [stories, setStories] = useState([]);
  const [storiesLoading, setStoriesLoading] = useState<boolean>(true);

  useEffect(() => {
    return () => {}
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          <Text>{serie.thumbnail.path} {serie.thumbnail.extension}</Text>
          <Text>{serie.title}</Text>
          {
            serie.description &&
            <Text>{serie.description}</Text>
          }
          <Text>{serie.startYear} - {serie.endYear}</Text>
          <Text>{serie.modified}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Serie;