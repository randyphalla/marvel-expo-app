import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import md5 from 'md5';
import { privateKey, publicKey } from '../../src/shared/apiKey';
// import { ComicSummary } from '../models/ComicsModel';
import { EventSummary, EventModel } from '../models/EventsModel';
import { SeriesSummary, SeriesModel } from '../models/SeriesModel';
import { StorySummary, StoryModel } from '../models/StoriesModel';
import { ComicModel } from '../models/ComicsModel';
import BannerInfo from '../components/BannerInfo';
import BannerImage from '../components/BannerImage';

export default function Character({navigation, route}) {
  
  const [comics, setComics] = useState<ComicModel[]>([]);
  const [events, setEvents] = useState<EventModel[]>([]);
  const [series, setSeries] = useState<SeriesModel[]>([]);
  const [stories, setStories] = useState<StoryModel[]>([]);

  const comicsData: ComicModel[] = [];
  const comicsURLS: string[] = [];

  const eventsData = [];
  const eventsURLS = [];

  const seriesData = [];
  const seriesURLS = [];

  const storiesData = [];
  const storiesURLS = [];

  const character = route.params.data;
  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);
  const limit = 20;

  // function secretHashKey(url: string, type: string) {
  //   const ts = new Date().getTime();
  //   const stringToHash = ts + privateKey + publicKey;
  //   const hash = md5(stringToHash);
  //   const limit = 20;
  //   const specialUrl = `${url}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
  //   console.log(specialUrl);
  //   redirectToPage(specialUrl, type);
  // }

  // function redirectToPage(specialUrl: string, screenType: string) {
  //   if (screenType === 'comics') {
  //     navigation.navigate('Comic', {url: specialUrl});
  //   } else if (screenType === 'events') {
  //     navigation.navigate('Event', {url: specialUrl});
  //   }  else if (screenType === 'series') {
  //     navigation.navigate('serie', {url: specialUrl});
  //   }  else if (screenType === 'story') {
  //     navigation.navigate('Story', {url: specialUrl});
  //   }
  // }

  // function getComic(url: string) {
  //   secretHashKey(url, 'comics');
  // }

  // function getEvent(url: string) {
  //   secretHashKey(url, 'events');
  // }
  
  // function getSerie(url: string) {
  //   secretHashKey(url, 'series');
  // }

  // function getStory(url: string) {
  //   secretHashKey(url, 'story');
  // }

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
    console.log(eventsItems);
  }

  async function getSeries() {
    const seriesItems = character.series.items;
    console.log(seriesItems);
  }

  async function getStories() {
    const storiesItems = character.stories.items;
    console.log(storiesItems);
  }

  function goToComicDetail(comic: ComicModel) {
    console.log(comic);
    navigation.navigate('Comic', {data: comic});
  }

  function goToEventDetail(event: EventModel) {
    console.log(event);
    // navigation.navigate('Event', {data: event});
  }

  function goToSeriesDetail(series: SeriesModel) {
    console.log(series);
    // navigation.navigate('Series', {data: series});
  }

  function goToStoryDetail(story: StoryModel) {
    console.log(story);
    // navigation.navigate('Story', {data: story});
  }

  useEffect(() => {
    getComics();
    getEvents();
    getSeries();
    getStories();
    return () => {
      setComics([]);
    }
  },[]); 

  return (
    <SafeAreaView style={styles.characterSafeAreaView}>

      <ScrollView>
      
        <BannerImage
          isComic={false}
          path={ character.thumbnail.path} 
          extension={character.thumbnail.extension}
        ></BannerImage>

        <BannerInfo 
          name={character.name} 
          description={character.description}
        ></BannerInfo>

        <View style={styles.characterItemsContainer}>

          <View style={styles.characterItem}>
            <Text style={styles.characterItemTitle}>Comics</Text>
            <View style={styles.characterItemList}>
              {
                comics.map((comic: ComicModel, i: number) => (
                  <TouchableOpacity style={[styles.characterItemButton, styles.characterItemImageButton]} key={i} onPress={() => goToComicDetail(comic)}>
                    <Image 
                      style={styles.characterItemImage}
                      source={{uri: comic.thumbnail.path + '.' + comic.thumbnail.extension}} 
                      resizeMode="contain"
                    />
                    <Text style={[styles.characterItemText, styles.characterItemTitleWithImage]}>{ comic.title }</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
          </View>
          
          <View style={styles.characterItem}>
            <Text style={styles.characterItemTitle}>Events</Text>
              {
                character.events && character.events.items.map((event: EventSummary, i: number) => (
                  <TouchableOpacity style={styles.characterItemButton} key={i} onPress={() => goToEventDetail(event)}>
                    <Text style={styles.characterItemText}>{ event.name }</Text>
                  </TouchableOpacity>
                ))
              }
              {
                character.events && character.events.items > 0 ? (
                  <View>
                    <Text>Events not available</Text>
                  </View>
                ) : null
              }
          </View>

          <View style={styles.characterItem}>
            <Text style={styles.characterItemTitle}>Series</Text>
              {
                character.series.items.map((series: SeriesSummary, i: number) => (
                  <TouchableOpacity style={styles.characterItemButton} key={i} onPress={() => goToSeriesDetail(series)}>
                    <Text style={styles.characterItemText}>{ series.name }</Text>
                  </TouchableOpacity>
                ))
              }
          </View>

          <View style={styles.characterItem}>
            <Text  style={styles.characterItemTitle}>Stories</Text>
            {
              character.stories.items.map((story: StorySummary, i: number) => (
                <TouchableOpacity style={styles.characterItemButton} key={i} onPress={() => goToStoryDetail(story)}>
                  <Text style={styles.characterItemText}>{ story.name }</Text>
                </TouchableOpacity>
              ))
            }
          </View>

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
  characterItemImageButton: { width: '50%' },
  characterItemText: {
    color: '#202020',
    fontSize: 14,
    fontWeight: '400'
  },
});