import React, { useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import md5 from 'md5';

import BannerImage from '../components/BannerImage';
import BannerInfo from '../components/BannerInfo';
import SectionTitle from '../components/SectionTitle';
import ImageCard from '../components/ImageCard';

import { CharacterModel } from '../models/CharacterModel';
import { EventsModel } from '../models/EventsModel';
import { StoriesModel } from '../models/StoriesModel';
import { CreatorModel } from '../models/CreatorsModel';

import { privateKey, publicKey } from '../shared/apiKey';

const Comic = ({navigation, route}: any) => {

  const comic = route.params.data;
  
  const [characters, setCharacters] = useState<CharacterModel[]>([]);
  const [isCharactersLoading, setCharactersLoading] = useState<boolean>(true);

  const [creators, setCreators] = useState<CreatorModel[]>([]);
  const [isCreatorsLoading, setCreatorsLoading] = useState<boolean>(true);

  const [events, setEvents] = useState<EventsModel[]>([]);
  const [isEventsLoading, setEventsLoading] = useState<boolean>(true);

  const [stories, setStories] = useState<StoriesModel[]>([]);
  const [isStoriesLoading, setStoriesLoading] = useState<boolean>(true);

  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);

  const charactersURLS: string[] = [];
  const charactersData: CharacterModel[] = [];

  const creatorsURLS: string[] = [];
  const creatorsData: CreatorModel[] = [];

  const eventsURLS: string[] = [];
  const eventsData: EventsModel[] = [];

  const storiesURLS: string[] = [];
  const storiesData: StoriesModel[] = [];

  const getCharacters = async () => {
    const comicCharacters = comic.characters.items;

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

  const getCreators = async () => {
    const comicCreators = comic.creators.items;
    
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
    const comicEvents = comic.events.items;

    for (const key in comicEvents) {
      const specialUrl = `${comicEvents[key].resourceURI}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
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
    const comicStories = comic.stories.items;

    for (const key in comicStories) {
      const specialUrl = `${comicStories[key].resourceURI}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
      storiesURLS.push(specialUrl);
    }

    for (const urls of storiesURLS) {
      let res = await fetch(urls);
      let json = await res.json();
      storiesData.push(json.data.results[0]);
    }
    
    setStories(storiesData);
    setStoriesLoading(false);
  }

  const renderCharacters = () => {
    if (characters && characters.length > 0) {
      return (
        <View style={styles.CharacterListView}>
          {
            characters.map((character, index) => 
              <ImageCard 
                key={index}
                text={character.name}
                path={character.thumbnail.path}
                extension={character.thumbnail.extension}
                onPress={() => goToCharacterDetail(character)}
              />
            )
          }
        </View>
      )
    } else {
      return (
        <View>
          <Text>Character's not available</Text>
        </View>
      )
    }
  };

  const renderCreators = () => {
    if (creators && creators.length > 0) {
      return (
        <View style={styles.CharacterListView}>
          {
            creators.map((creator, index) => 
              <ImageCard 
                key={index}
                text={creator.fullName}
                path={creator.thumbnail.path}
                extension={creator.thumbnail.extension}
                onPress={() => goToCreatorDetail(creator)}
              />
            )
          }
        </View>
      )
    } else {
      return (
        <View>
          <Text>Creator's not available</Text>
        </View>
      )
    }
  };

  const renderEvents = () => {
    if (events && events.length > 0) {
      return (
        <View>
          {
            events.map((event: EventsModel, index: number) => 
              <TouchableOpacity 
                key={index} 
                style={styles.CharacterItemButton} 
                onPress={() => goToEventDetail(event)}
              >
                <Text style={styles.CharacterItemText} key={index}>{event.title}</Text>
              </TouchableOpacity>
            )
          }
        </View>
      )
    } else {
      return (
        <View>
          <Text>Event's not available</Text>
        </View>
      )
    }
  };

  const renderStories = () => {
    if (stories && stories.length > 0) {
      return (
        <View>
          { 
            stories.map((story: StoriesModel, index: number) =>           
            <TouchableOpacity 
              key={index} 
              style={styles.CharacterItemButton} 
              onPress={() => goToStoryDetail(story)}
            >
              <Text style={styles.CharacterItemText} key={index}>{story.title}</Text>
            </TouchableOpacity>
            )
          }
        </View>
      )
    } else {
      return (
        <View>
          <Text>Stories not available</Text>
        </View>
      )
    }
  };

  const renderImages = () => {
    if (comic.images && comic.images.length > 0) {
      return (
        comic.images.map((image: {path:string, extension: string}, index: number) => 
          <View style={styles.CharacterItem} key={index}>
            <Image 
              style={styles.CharacterItemImage} 
              source={{uri: image.path + '.' + image.extension}} 
              resizeMode="cover"
            />
          </View>
        )
      )
    } else {
      return (
        <View>
          <Text>Image's not available</Text>
        </View>
      )
    }
  };

  const goToCharacterDetail = (character: CharacterModel) => navigation.navigate('Character', {data: character});
  const goToCreatorDetail = (creator: CreatorModel) => navigation.navigate('Creator', {data: creator});
  const goToEventDetail = (event: EventsModel) => navigation.navigate('Event', {data: event});
  const goToStoryDetail = (story: StoriesModel) => navigation.navigate('Story', {data: story});

  useEffect(() => {
    getCharacters();
    getCreators();
    getEvents();
    getStories();

    return () => {
      // setCharacters([]);
      setCharactersLoading(false);
      // setCreators([]);
      setCreatorsLoading(false);
      // setEvents([]);
      setEventsLoading(false);
      // setStories([]);
      setStoriesLoading(false);
    }
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        
        <BannerImage
          isComic={true}
          path={comic.thumbnail.path} 
          extension={comic.thumbnail.extension}
        ></BannerImage>

        <BannerInfo 
          name={comic.title} 
          description={comic.description}
        ></BannerInfo>

        <View style={styles.ContentView}>

          <SectionTitle title="Characters">
            { renderCharacters() }
          </SectionTitle>

          <SectionTitle title="Creators">
            { renderCreators() }
          </SectionTitle>

          <SectionTitle title="Events">
            { renderEvents() }
          </SectionTitle>

          <SectionTitle title="Stories">
            { renderStories() }
          </SectionTitle>

          <SectionTitle title="Images">
            { renderImages() }
          </SectionTitle>

          <View style={styles.MiscView}>
            <Text style={styles.MiscTitle}>Misc Information</Text>
            <Text style={styles.MiscText}>
              Digital ID: <Text style={styles.MiscTextData}>{ comic.digitalId }</Text>
            </Text>
            <Text style={styles.MiscText}>
              Issue number: <Text style={styles.MiscTextData}>{ comic.issueNumber }</Text>
            </Text>
            <Text style={styles.MiscText}>
              Variant description: <Text style={styles.MiscTextData}>{ comic.variantDescription }</Text>
            </Text>
            <Text style={styles.MiscText}>
              Modified: <Text style={styles.MiscTextData}>{ comic.modified }</Text>
            </Text>
            <Text style={styles.MiscText}>
              ISBN: <Text style={styles.MiscTextData}>{ comic.isbn }</Text>
            </Text>
            <Text style={styles.MiscText}>
              ISSN: <Text style={styles.MiscTextData}>{ comic.issn }</Text>
            </Text>
            <Text style={styles.MiscText}>
              UPC: <Text style={styles.MiscTextData}>{ comic.upc }</Text>
            </Text>
            <Text style={styles.MiscText}>
              Diamond code: <Text style={styles.MiscTextData}>{ comic.diamondCode }</Text>
            </Text>
            <Text style={styles.MiscText}>
              EAN: <Text style={styles.MiscTextData}>{ comic.ean }</Text>
            </Text>
            <Text style={styles.MiscText}>
              Format: <Text style={styles.MiscTextData}>{ comic.format }</Text>
            </Text>
            <Text style={styles.MiscText}>
              Page count: <Text style={styles.MiscTextData}>{ comic.pageCount }</Text>
            </Text>
            <Text style={styles.MiscText}>
              Resource URI: <Text style={styles.MiscTextData}>{ comic.resourceURI }</Text>
            </Text>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  ContentView: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#ffffff'
  },
  MiscView: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  MiscTitle: {
    marginBottom: 8,
    fontSize: 20,
    fontWeight: '700'
  },
  MiscText: {
    marginBottom: 3,
    fontSize: 14
  },
  MiscTextData: {
    fontWeight: '700'
  },
  CharacterListView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  CharacterItem: {
    marginBottom: 16,
    width: '48%'
  },
  CharacterItemImage: {
    width: '100%', 
    height: 170,
    marginBottom: 8,
    borderRadius: 8
  },
  CharacterItemButton: {
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: 3,
    marginBottom: 3
  },
  CharacterItemText: {
    color: '#202020',
    fontSize: 14,
    fontWeight: '400'
  }
});

export default Comic;