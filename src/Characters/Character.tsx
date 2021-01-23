import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import md5 from 'md5';

import { EventsModel } from '../models/EventsModel';
import { SeriesModel } from '../models/SeriesModel';
import { StoriesModel } from '../models/StoriesModel';
import { ComicModel } from '../models/ComicsModel';

import BannerInfo from '../components/BannerInfo';
import BannerImage from '../components/BannerImage';
import SectionTitle from '../components/SectionTitle';
import ImageCard from '../components/ImageCard';
import Link from '../components/Link';

import { privateKey, publicKey } from '../../src/shared/apiKey';
import { whiteColor } from '../styles';

const Character = ({navigation, route}: any) => {
  const [comics, setComics] = useState<ComicModel[]>([]);
  const [comicsLoading, setComicsLoading] = useState(false);

  const [events, setEvents] = useState<EventsModel[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  const [series, setSeries] = useState<SeriesModel[]>([]);
  const [seriesLoading, setSeriesLoading] = useState(false);

  const [stories, setStories] = useState<StoriesModel[]>([]);
  const [storiesLoading, setStoriesLoading] = useState(false);

  const comicsURLS: string[] = [];
  const comicsData: ComicModel[] = [];

  const eventsURLS: string[] = [];
  const eventsData: EventsModel[] = [];

  const seriesURLS: string[] = [];
  const seriesData: SeriesModel[] = [];

  const storiesURLS: string[] = [];
  const storesJSONData: any[] = [];
  const storiesData: StoriesModel[] = [];

  const character = route.params.data;
  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);
  
  const getComics = async () => {
    const comicsItems = character.comics.items;
    
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
    setComicsLoading(true);
  }

  const getEvents = async () => {
    const eventsItems = character.events.items;
    
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
    setEventsLoading(true);
  }
  
  const getSeries = async () => {
    const seriesItems = character.series.items;

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
    setSeriesLoading(true);
  }

  const getStories = async () => {
    const storiesItems = character.stories.items;

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
    setStoriesLoading(true);
  }

  const goToComicDetail = (comic: ComicModel) => navigation.navigate('Comic', {data: comic});
  const goToEventDetail = (event: EventsModel) => navigation.navigate('Event', {data: event});
  const goToSeriesDetail = (series: SeriesModel) => navigation.navigate('Serie', {data: series});
  const goToStoryDetail = (story: StoriesModel) => navigation.navigate('Story', {data: story});

  const renderComics = () => {
    if (comics && comicsLoading) {
      return (
        <SectionTitle title="Comics">
        <View style={styles.ItemList}>
          {comics.map((comic: ComicModel, index: number) => (
            <ImageCard 
              key={index}
              text={comic.title}
              path={comic.thumbnail.path}
              extension={comic.thumbnail.extension}
              onPress={() => goToComicDetail(comic)}
            />
          ))}
        </View>
      </SectionTitle>
      )
    }
  }

  const renderEvents = () => {
    if (events && eventsLoading) {
      return (
        <SectionTitle title="Events">
        <View style={styles.ItemList}>
          {events.map((event: EventsModel, index: number) => 
            <ImageCard 
              key={index}
              text={event.title}
              path={event.thumbnail.path}
              extension={event.thumbnail.extension}
              onPress={() => goToEventDetail(event)}
            />
          )}
        </View>
      </SectionTitle>
      )
    }
  }

  const renderSeries = () => {
    if (series && seriesLoading) {
      return (
        <SectionTitle title="Series">
          <View style={styles.ItemList}>
            {series.map((serie: SeriesModel, index: number) => 
              <ImageCard 
                key={index}
                text={serie.title}
                path={serie.thumbnail.path}
                extension={serie.thumbnail.extension}
                onPress={() => goToSeriesDetail(serie)}
              />
            )}
          </View>
        </SectionTitle>
      )
    }
  }

  const renderStories = () => {
    if (stories && storiesLoading) {
      return (
        <SectionTitle title="Stories">
          {stories.map((story: StoriesModel, index: number) => 
            <Link 
              key={index} 
              text={story.title}
              onPress={() => goToStoryDetail(story)}
            />
          )}
        </SectionTitle>
      )
    }
  }

  const getAllData = () => {
    getComics();
    getEvents();
    getSeries();
    getStories();
  };

  const returnAllData = () => {
    setComics([]);
    setComicsLoading(false);
    setEvents([]);
    setEventsLoading(false);
    setSeries([]);
    setSeriesLoading(false);
    setStories([]);
    setStoriesLoading(false);
  };

  useEffect(() => {
    getAllData();
    
    return () => {
      returnAllData();
    }
  },[]); 
  
  return (
    <SafeAreaView style={styles.characterSafeAreaView}>
      <ScrollView>
        <BannerImage
          isComic={false}
          path={ character.thumbnail.path} 
          extension={character.thumbnail.extension}
        />
        <BannerInfo 
          name={character.name} 
          description={character.description}
        />
        <View style={styles.characterItemsContainer}>
          { renderComics() }
          { renderEvents() }
          { renderSeries() }
          { renderStories() }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  characterSafeAreaView: {
    flex: 1,
    backgroundColor: whiteColor
  },
  characterItemsContainer: {     
    marginTop: 16,
    padding: 16,
    backgroundColor: whiteColor
  },
  ItemList: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  }
});

export default Character;