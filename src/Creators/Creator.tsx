import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
import md5 from 'md5';

import BannerImage from '../components/BannerImage';
import BannerInfo from '../components/BannerInfo';
import ImageCard from '../components/ImageCard';
import Link from '../components/Link';
import SectionTitle from '../components/SectionTitle';

import { ComicModel } from '../models/ComicsModel';
import { EventsModel } from '../models/EventsModel';
import { SeriesModel } from '../models/SeriesModel';
import { StoriesModel } from '../models/StoriesModel';

import { privateKey, publicKey } from '../shared/apiKey';
import { whiteColor } from '../styles';

const Creator = ({navigation, route}: any) => {
  
  const creator = route.params.data;
  
  const [comics, setComics] = useState<ComicModel[]>([]);
  const [comicsLoading, setComicsLoading] = useState<boolean>(true);

  const [events, setEvents] = useState<EventsModel[]>([]);
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);

  const [series, setSeries] = useState<SeriesModel[]>([]);
  const [seriesLoading, setSeriesLoading] = useState<boolean>(true);

  const [stories, setStories] = useState<StoriesModel[]>([]);
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

  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);

  const getComics = async () => {
    const comicsItems = creator.comics.items;
    
    for (const key in comicsItems) {
      const specialUrl = `${comicsItems[key].resourceURI}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
      comicsURLS.push(specialUrl);
    }

    for (const urls of comicsURLS) {
      let res = await fetch(urls);
      let json = await res.json();
      comicsData.push(json.data.results[0]);
    } 

    setComics(comicsData);
    setComicsLoading(false);
  };

  const getEvents = async () => {
    const eventsItems = creator.events.items;
    
    for (const key in eventsItems) {
      const specialUrl = `${eventsItems[key].resourceURI}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
      eventsURLS.push(specialUrl);
    }

    for (const urls of eventsURLS) {
      let res = await fetch(urls);
      let json = await res.json();
      eventsData.push(json.data.results[0]);
    } 

    setEvents(eventsData);
    setEventsLoading(false);
  }
  
  const getSeries = async () => {
    const seriesItems = creator.series.items;

    for (const key in seriesItems) {
      const specialUrl = `${seriesItems[key].resourceURI}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
      seriesURLS.push(specialUrl);
    }

    for (const urls of seriesURLS) {
      let res = await fetch(urls);
      let json = await res.json();
      seriesData.push(json.data.results[0]);
    } 

    setSeries(seriesData);
    setSeriesLoading(false);
  }

  const getStories = async () => {
    const storiesItems = creator.stories.items;

    for (const key in storiesItems) {
      const specialUrl = `${storiesItems[key].resourceURI}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
      storiesURLS.push(specialUrl);
    }

    for (const urls of storiesURLS) {
      let res = await fetch(urls);
      let json = await res.json();
      if (json.data && json.data.results) {
        storesJSONData.push(json.data.results[0]);
      }
    } 

    storesJSONData.map(res => {
      storiesData.push(res);
    })

    setStories(storiesData);
    setStoriesLoading(false);
  }

  const goToComicDetail = (comic: ComicModel) => navigation.navigate('Comic', {data: comic});
  const goToEventDetail = (event: EventsModel) => navigation.navigate('Event', {data: event});
  const goToSeriesDetail = (series: SeriesModel) => navigation.navigate('Serie', {data: series});
  const goToStoryDetail = (story: StoriesModel) => navigation.navigate('Story', {data: story});

  const renderComics = () => {
    if (comics && comics.length > 0) {
      return (
        comics.map((comic: ComicModel, index: number) => (
          <ImageCard 
            key={index}
            text={comic.title}
            path={comic.thumbnail.path}
            extension={comic.thumbnail.extension}
            onPress={() => goToComicDetail(comic)}
          />
        ))
      )
    } else {
      return (
        <View>
          <Text>No Comics</Text>
        </View>
      )
    }
  };

  const renderEvents = () => {
    if (events && events.length > 0) {
      return (
        events.map((event: EventsModel, index: number) => 
          <ImageCard 
            key={index}
            text={event.title}
            path={event.thumbnail.path}
            extension={event.thumbnail.extension}
            onPress={() => goToEventDetail(event)}
          />
        )
      )
    } else {
      return (
        <View>
          <Text>No Events</Text>
        </View>
      )
    }
  };

  const renderSeries = () => {
    if (series && series.length > 0) {
      return (
        series.map((serie: SeriesModel, index: number) => 
          <ImageCard 
            key={index}
            text={serie.title}
            path={serie.thumbnail.path}
            extension={serie.thumbnail.extension}
            onPress={() => goToSeriesDetail(serie)}
          />
        )
      )
    } else {
      return (
        <View>
          <Text>No Series</Text>
        </View>
      )
    }
  };

  const renderStories = () => {
    if (stories && stories.length > 0) {
      return (
        stories.map((story: StoriesModel, index: number) => 
          <Link 
            key={index} 
            text={story.title}
            onPress={() => goToStoryDetail(story)}
          />
        )
      )
    } else {
      return (
        <View>
          <Text>No Stories</Text>
        </View>
      )
    }
  };

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
    <SafeAreaView style={{
      flex: 1, 
      backgroundColor: whiteColor
    }}>
      <ScrollView>

        <BannerImage
          path={creator.thumbnail.path} 
          extension={creator.thumbnail.extension}
        />

        <BannerInfo 
          name={creator.fullName} 
          description={creator.modified} 
        />

        <View style={{
          marginTop: 16,
          padding: 16,
          backgroundColor: whiteColor
        }}>

          <SectionTitle title="Comics">
            <View style={styles.ItemList}>
              { renderComics() }
            </View>
          </SectionTitle>
          
          <SectionTitle title="Events">
            <View style={styles.ItemList}>
              { renderEvents() }
            </View>
          </SectionTitle>

          <SectionTitle title="Series">
            <View style={styles.ItemList}>
              { renderSeries() }
            </View>
          </SectionTitle>

          <SectionTitle title="Stories">
            { renderStories() }
          </SectionTitle>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  ItemList: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  }
});

export default Creator;