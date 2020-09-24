import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import BannerImage from '../components/BannerImage';
import BannerInfo from '../components/BannerInfo';

import { ComicModel } from '../models/ComicsModel';
import { EventsModel } from '../models/EventsModel';
import { SeriesModel } from '../models/SeriesModel';
import { StoriesModel } from '../models/StoriesModel';

const Creator = ({navigation, route}: any) => {
  
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

  const comicsURLS: string[] = [];
  const comicsData: ComicModel[] = [];

  const eventsURLS: string[] = [];
  const eventsData: EventsModel[] = [];

  const seriesURLS: string[] = [];
  const seriesData: SeriesModel[] = [];

  const storiesURLS: string[] = [];
  const storesJSONData: any[] = [];
  const storiesData: StoriesModel[] = [];

  const getComics = () => {

  }

  const getEvents = () => {

  }

  const getSeries = () => {

  }

  const getStories = () => {

  }

  useEffect(() => {
    getComics();    
    getEvents();
    getSeries();
    getStories();

    return () => {
      setComics([]);
      setComicsLoading(false);
      setEvents([]);
      setEventsLoading(false);
      setSeries([]);
      setSeriesLoading(false);
      setStories([]);
      setStoriesLoading(false);
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView>

        <BannerImage
          path={creator.thumbnail.path} 
          extension={creator.thumbnail.extension}
        />

        <BannerInfo 
          name={creator.fullName} 
          description={creator.modified} 
        />

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

export default Creator;