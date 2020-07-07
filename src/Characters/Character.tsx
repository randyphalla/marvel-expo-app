import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import md5 from 'md5';
import { privateKey, publicKey } from '../../src/shared/apiKey';
import { EventModel } from '../models/EventsModel';
import { SeriesModel } from '../models/SeriesModel';
import { StoryModel } from '../models/StoriesModel';
import { ComicModel } from '../models/ComicsModel';
import BannerInfo from '../components/BannerInfo';
import BannerImage from '../components/BannerImage';
import ComicItem from '../components/ComicItem';
import SectionTitle from '../components/SectionTitle';

export default function Character({navigation, route}: any) {
  const [comics, setComics] = useState<ComicModel[]>([]);
  const [events, setEvents] = useState<EventModel[]>([]);
  const [series, setSeries] = useState<SeriesModel[]>([]);
  const [stories, setStories] = useState<StoryModel[]>([]);

  const comicsURLS: string[] = [];
  const comicsData: ComicModel[] = [];

  const eventsURLS: string[] = [];
  const eventsData: EventModel[] = [];

  const seriesURLS: string[] = [];
  const seriesData: SeriesModel[] = [];

  const storiesURLS: string[] = [];
  const storesJSONData: any[] = [];
  const storiesData: StoryModel[] = [];

  const character = route?.params.data;
  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);
  const limit = 20;
  
  async function getComics() {
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
  }

  async function getEvents() {
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
    console.log(events);
  }

  async function getSeries() {
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
  }

  async function getStories() {
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
  }

  function goToComicDetail(comic: ComicModel) {
    console.log(comic);
    navigation.navigate('Comic', {data: comic});
  }

  function goToEventDetail(event: EventModel) {
    console.log(event);
    navigation.navigate('Event', {data: event});
  }

  function goToSeriesDetail(series: SeriesModel) {
    console.log(series);
    navigation.navigate('Series', {data: series});
  }

  function goToStoryDetail(story: StoryModel) {
    console.log(story);
    navigation.navigate('Story', {data: story});
  }
  
  useEffect(() => {
    getComics();
    getEvents();
    getSeries();
    getStories();
    
    return () => {
      setComics([]);
      setEvents([]);
      setSeries([]);
      setStories([]);
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

          <SectionTitle title="Comics">
            <View style={styles.characterItemList}>
              {
                comics.map((comic: ComicModel, i: number) => (
                  <ComicItem 
                    path={comic.thumbnail.path}
                    extension={comic.thumbnail.extension}
                    title={comic.title}
                    key={i}
                    pressEvent={() => goToComicDetail(comic)}
                  />
                ))
              }
            </View>
          </SectionTitle>
          
          <SectionTitle title="Events">
            {
              events.map((event: EventModel, i: number) => (
                <TouchableOpacity style={styles.characterItemButton} key={i} onPress={() => goToEventDetail(event)}>
                  <Text style={styles.characterItemText}>{ event.title }</Text>
                </TouchableOpacity>
              ))
            }
            {
              events && events.length <= 0 ? (
                <View>
                  <Text>Events not available</Text>
                </View>
              ) : null
            }
          </SectionTitle>
          
          <SectionTitle title="Series">
            {
              series.map((series: SeriesModel, i: number) => (
                <TouchableOpacity style={styles.characterItemButton} key={i} onPress={() => goToSeriesDetail(series)}>
                  <Text style={styles.characterItemText}>{ series.title }</Text>
                </TouchableOpacity>
              ))
            }
          </SectionTitle>

          <SectionTitle title="Stories">
            {
              stories.map((story: StoryModel, i: number) => (
                <TouchableOpacity style={styles.characterItemButton} key={i} onPress={() => goToStoryDetail(story)}>
                  <Text style={styles.characterItemText}>{ story.title }</Text>
                </TouchableOpacity>
              ))
            }
          </SectionTitle>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  characterSafeAreaView: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  characterView: {},
  characterItemsContainer: { padding: 16 },
  characterItemList: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  characterItem: {
    marginTop: 6,
    marginBottom: 6,
  },
  characterItemImage: {
    width: '100%',
    height: 250
  },
  characterItemTitle: {
    color: '#202020',
    marginBottom: 6,
    fontSize: 24,
    fontWeight: '800'
  },
  characterItemTitleWithImage: {
    marginTop: 10,
    marginLeft: 6
  },
  characterItemButton: {
    padding: 6,
    marginTop: 3,
    marginBottom: 3
  },
  characterItemImageButton: { width: '49%' },
  characterItemText: {
    color: '#202020',
    fontSize: 14,
    fontWeight: '400'
  },
});