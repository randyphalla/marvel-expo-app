import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import BannerImage from '../components/BannerImage';
import BannerInfo from '../components/BannerInfo';

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
    <SafeAreaView style={{
      flexDirection:'column', 
      flex: 1, 
      width: '100%'
    }}>
      <ScrollView contentContainerStyle={{
        flexGrow: 1, 
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff'
      }}>

        <BannerImage
          path={serie.thumbnail.path} 
          extension={serie.thumbnail.extension}
        />

        <BannerInfo 
          name={serie.title} 
          description={serie.description} 
        />

        <View style={{padding: 13}}>
          <Text>{serie.startYear} - {serie.endYear}</Text>
          <Text>{serie.modified}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Serie;