import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from 'react-native';
import md5 from 'md5';

import ImageCard from '../components/ImageCard';
import SectionTitle from '../components/SectionTitle';

import { CharacterModel } from '../models/CharacterModel';
import { ComicModel } from '../models/ComicsModel';
import { CreatorModel } from '../models/CreatorsModel';
import { EventsModel } from '../models/EventsModel';
import { SeriesModel } from '../models/SeriesModel';

import { privateKey, publicKey } from '../shared/apiKey';
import { blackColor, whiteColor } from '../styles';

const Story = ({navigation, route}: any) => {
  
  const story = route.params.data;
    
  const [characters, setCharacters] = useState<CharacterModel[]>([]);
  const [charactersLoading, setCharactersLoading] = useState<boolean>(true);

  const [comics, setComics] = useState<ComicModel[]>([]);
  const [comicsLoading, setComicsLoading] = useState<boolean>(true);

  const [creators, setCreators] = useState<CreatorModel[]>([]);
  const [creatorsLoading, setCreatorsLoading] = useState<boolean>(true);

  const [events, setEvents] = useState<EventsModel[]>([]);
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);

  const [series, setSeries] = useState<SeriesModel[]>([]);
  const [seriesLoading, setSeriesLoading] = useState<boolean>(true);

  const charactersURLS: string[] = [];
  const charactersData: CharacterModel[] = [];

  const comicsURLS: string[] = [];
  const comicsData: ComicModel[] = [];

  const creatorsURLS: string[] = [];
  const creatorsData: CreatorModel[] = [];

  const eventsURLS: string[] = [];
  const eventsData: EventsModel[] = [];

  const seriesURLS: string[] = [];
  const seriesData: SeriesModel[] = [];
  
  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);

  const getCharacters = async () => {
    const comicCharacters = story.characters.items;

    for (const key in comicCharacters) {
      const specialUrl = `${comicCharacters[key].resourceURI}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
      charactersURLS.push(specialUrl);
    }

    for (const urls of charactersURLS) {
      let res = await fetch(urls);
      let json = await res.json();
      charactersData.push(json.data.results[0]);
    }

    setCharacters(charactersData);
    setCharactersLoading(false); 
  };

  const getComics = async () => {
    const comicsItems = story.comics.items;
    
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
  
  const getCreators = async () => {
    const comicCreators = story.creators.items;
    
    for (const key in comicCreators) {
      const specialUrl = `${comicCreators[key].resourceURI}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
      creatorsURLS.push(specialUrl);
    }

    for (const urls of creatorsURLS) {
      let res = await fetch(urls);
      let json = await res.json();
      creatorsData.push(json.data.results[0]);
    }
    
    setCreators(creatorsData);
    setCreatorsLoading(false);
  }

  const getEvents = async () => {
    const eventsItems = story.events.items;
    
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
    const seriesItems = story.series.items;

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

  const goToCharacterDetail = (character: CharacterModel) => navigation.navigate('Character', {data: character});
  const goToComicDetail = (comic: ComicModel) => navigation.navigate('Comic', {data: comic});
  const goToCreatorDetail =  (creator: CreatorModel) => navigation.navigate('Creator', {data: creator});
  const goToEventDetail = (event: EventsModel) => navigation.navigate('Event', {data: event});
  const goToSeriesDetail = (series: SeriesModel) => navigation.navigate('Serie', {data: series});

  const renderCharacters = () => {
    if (characters && characters.length > 0) {
      return (
        characters.map((character: CharacterModel, index: number) => 
          <ImageCard 
            key={index}
            text={character.name}
            path={character.thumbnail.path}
            extension={character.thumbnail.extension}
            onPress={() => goToCharacterDetail(character)}
          />
        )
      )
    } else {
      return (
        <View>
          <Text>No Characters</Text>
        </View>
      )
    }
  };

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
  
  const renderCreators = () => {
    if (creators && creators.length > 0) {
      return (
        creators.map((creator, index) => 
          <ImageCard 
            key={index}
            text={creator.fullName}
            path={creator.thumbnail.path}
            extension={creator.thumbnail.extension}
            onPress={() => goToCreatorDetail(creator)}
          />
        )
      )
    } else {
      return (
        <View>
          <Text>No Creators</Text>
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

  const getAllData = () => {
    getCharacters();
    getComics();  
    getCreators();  
    getEvents();
    getSeries();
  };

  const returnAllData = () => {
    setCharacters([]);
    setCharactersLoading(false);
    setComics([]);
    setCreators([]);
    setCreatorsLoading(false);
    setComicsLoading(false);
    setEvents([]);
    setEventsLoading(false);
    setSeries([]);
    setSeriesLoading(false);
  };

  useEffect(() => {
    getAllData();

    return () => {
      returnAllData();
    }
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: whiteColor
    }}>
      <ScrollView>

        <View style={{
          padding: 16,
          backgroundColor: whiteColor
        }}>

          <View style={styles.StoryView}>
            <Text style={styles.StoryTitle}>{story.title}</Text>
            {
              story && story.originalIssue ? (
                <Text style={styles.StoryOriginalIssueName}>{story.originalIssue.name}</Text>
              ) : null
            }
            <Text style={styles.StoryModified}>{story.modified}</Text>
          </View>

          <SectionTitle title="Characters">
            <View style={styles.ItemList}>
              { renderCharacters() }
            </View>
          </SectionTitle>

          <SectionTitle title="Comics">
            <View style={styles.ItemList}>
              { renderComics() }
            </View>
          </SectionTitle>
          
          <SectionTitle title="Creators">
            <View style={styles.ItemList}>
              { renderCreators() }
            </View>
          </SectionTitle>

          <SectionTitle title="Events">
            <View style={styles.ItemList}>
              { renderEvents() }
            </View>
          </SectionTitle>

          <SectionTitle title="Events">
            <View style={styles.ItemList}>
              { renderSeries() }
            </View>
          </SectionTitle>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  StoryView: {
    marginBottom: 16
  },
  StoryTitle: {
    color: blackColor,
    fontSize: 20,
    fontWeight: '800'
  },
  StoryOriginalIssueName: {
    marginTop: 8,
    marginBottom: 8,
    color: blackColor,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18
  },
  StoryModified: {
    color: blackColor,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18
  },
  ItemList: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  }
});

export default Story;