import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from 'react-native';
import md5 from 'md5';

import BannerImage from '../components/BannerImage';
import BannerInfo from '../components/BannerInfo';

import { CharacterModel } from '../models/CharacterModel';
import { ComicModel } from '../models/ComicsModel';
import { CreatorModel } from '../models/CreatorsModel';
import { EventsModel } from '../models/EventsModel';
import { StoriesModel } from '../models/StoriesModel';

import { privateKey, publicKey } from '../shared/apiKey';
import Link from '../components/Link';
import ImageCard from '../components/ImageCard';
import SectionTitle from '../components/SectionTitle';

const Serie = ({navigation, route}: any) => {
  
  const serie = route?.params.data;

  const [characters, setCharacters] = useState<CharacterModel[]>([]);
  const [charactersLoading, setCharactersLoading] = useState<boolean>(true);

  const [comics, setComics] = useState<ComicModel[]>([]);
  const [comicsLoading, setComicsLoading] = useState<boolean>(true);

  const [creators, setCreators] = useState<CreatorModel[]>([]);
  const [creatorsLoading, setCreatorsLoading] = useState<boolean>(true);

  const [events, setEvents] = useState<EventsModel[]>([]);
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);

  const [stories, setStories] = useState<StoriesModel[]>([]);
  const [storiesLoading, setStoriesLoading] = useState<boolean>(true);

  const charactersURLS: string[] = [];
  const charactersData: CharacterModel[] = [];

  const comicsURLS: string[] = [];
  const comicsData: ComicModel[] = [];

  const creatorsURLS: string[] = [];
  const creatorsData: CreatorModel[] = [];

  const eventsURLS: string[] = [];
  const eventsData: EventsModel[] = [];

  const storiesURLS: string[] = [];
  const storesJSONData: any[] = [];
  const storiesData: StoriesModel[] = [];
  
  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);


  const getCharacters = async () => {
    const comicCharacters = serie.characters.items;

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
    const comicsItems = serie.comics.items;
    
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
    const comicCreators = serie.creators.items;
    
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
    const eventsItems = serie.events.items;
    
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

  const getStories = async () => {
    const storiesItems = serie.stories.items;

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

  const getAllData = () => {
    getCharacters();
    getComics();  
    getCreators();  
    getEvents();
    getStories();
  }

  const returnAllData = () => {
    setCharacters([]);
    setCharactersLoading(false);
    setComics([]);
    setCreators([]);
    setCreatorsLoading(false);
    setComicsLoading(false);
    setEvents([]);
    setEventsLoading(false);
    setStories([]);
    setStoriesLoading(false);
  }

  const goToCharacterDetail = (character: CharacterModel) => navigation.navigate('Character', {data: character});
  const goToComicDetail = (comic: ComicModel) => navigation.navigate('Comic', {data: comic});
  const goToCreatorDetail =  (creator: CreatorModel) => navigation.navigate('Creator', {data: creator});
  const goToEventDetail = (event: EventsModel) => navigation.navigate('Event', {data: event});
  const goToStoryDetail = (story: StoriesModel) => navigation.navigate('Story', {data: story});

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
    getAllData();

    return () => {
      returnAllData();
    }
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>

        <BannerImage
          path={serie.thumbnail.path} 
          extension={serie.thumbnail.extension}
        />

        <BannerInfo 
          name={serie.title} 
          description={serie.description} 
        />

        {/* <View style={{padding: 13}}>
          <Text>{serie.startYear} - {serie.endYear}</Text>
          <Text>{serie.modified}</Text>
        </View> */}

        <View style={{
          marginTop: 16,
          padding: 16,
          backgroundColor: '#ffffff' 
        }}>

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

export default Serie;