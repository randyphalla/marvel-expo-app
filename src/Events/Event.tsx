import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import BannerImage from '../components/BannerImage';
import BannerInfo from '../components/BannerInfo';

const Event = ({navigation, route}: any) => {

  const event = route?.params.data;
  console.log(event);

  const [characters, setCharacters] = useState([]);
  const [charactersLoading, setCharactersLoading] = useState<boolean>(true);

  const [comics, setComics] = useState([]);
  const [comicsLoading, setComicsLoading] = useState<boolean>(true);

  const [creators, setCreators] = useState([]);
  const [creatorsLoading, setCreatorsLoading] = useState<boolean>(true);

  const [series, setSeries] = useState([]);
  const [seriesLoading, setSeriesLoading] = useState<boolean>(true);

  const [stories, setStories] = useState([]);
  const [storiesLoading, setStoriesLoading] = useState<boolean>(true);

  useEffect(() => {
    return () => {}
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView>

        <BannerImage
          path={event.thumbnail.path} 
          extension={event.thumbnail.extension}
        />

        <BannerInfo 
          name={event.title} 
          description={event.description} 
        />

        <View style={{padding: 13}}>
          <Text>{event.modified}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
};

export default Event;