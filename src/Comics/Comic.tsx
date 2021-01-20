import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image } from 'react-native';
import md5 from 'md5';

import BannerImage from '../components/BannerImage';
import BannerInfo from '../components/BannerInfo';
import SectionTitle from '../components/SectionTitle';
import ImageCard from '../components/ImageCard';
import Link from '../components/Link';

import { CharacterModel } from '../models/CharacterModel';
import { EventsModel } from '../models/EventsModel';
import { StoriesModel } from '../models/StoriesModel';
import { CreatorModel } from '../models/CreatorsModel';

import { privateKey, publicKey } from '../shared/apiKey';
import { blackColor, whiteColor } from '../styles';

const Comic = ({ navigation, route }: any) => {
  const comic = route.params.data;

  const [characters, setCharacters] = useState<CharacterModel[]>([]);
  const [isCharactersLoading, setCharactersLoading] = useState<boolean>(false);

  const [creators, setCreators] = useState<CreatorModel[]>([]);
  const [isCreatorsLoading, setCreatorsLoading] = useState<boolean>(false);

  const [events, setEvents] = useState<EventsModel[]>([]);
  const [isEventsLoading, setEventsLoading] = useState<boolean>(false);

  const [stories, setStories] = useState<StoriesModel[]>([]);
  const [isStoriesLoading, setStoriesLoading] = useState<boolean>(false);

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
    setCharactersLoading(true);
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
    setCreatorsLoading(true);
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
    setEventsLoading(true);
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
    setStoriesLoading(true);
  }

  const renderCharacters = () => {
    if (characters && characters.length > 0 && isCharactersLoading) {
      return (
        <SectionTitle title="Characters">
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
        </SectionTitle>
      )
    }
  };

  const renderCreators = () => {
    if (creators && creators.length > 0 && isCreatorsLoading) {
      return (
        <SectionTitle title="Creators">
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
        </SectionTitle>
      )
    }
  };

  const renderEvents = () => {
    if (events && events.length > 0 && isEventsLoading) {
      return (
        <SectionTitle title="Events">
          <View>
            {events.map((event: EventsModel, index: number) =>
              <Link
                key={index}
                text={event.title}
                onPress={() => goToEventDetail(event)}
              />
            )}
          </View>
        </SectionTitle>
      )
    }
  };

  const renderStories = () => {
    if (stories && stories.length > 0 && isStoriesLoading) {
      return (
        <SectionTitle title="Stories">
          <View>
            {stories.map((story: StoriesModel, index: number) =>
              <Link
                key={index}
                text={story.title}
                onPress={() => goToStoryDetail(story)}
              />
            )}
          </View>
        </SectionTitle>
      )
    }
  };

  const renderImages = () => {
    if (comic.images && comic.images.length > 0) {
      return (
        <SectionTitle title="Images">
          <View style={styles.CharacterListView}>
            {comic.images.map((image: { path: string, extension: string }, index: number) =>
              <View style={styles.CharacterItem} key={index}>
                <Image
                  style={styles.CharacterItemImage}
                  source={{ uri: image.path + '.' + image.extension }}
                  resizeMode="cover"
                />
              </View>
            )}
          </View>
        </SectionTitle>
      )
    }
  };

  const goToCharacterDetail = (character: CharacterModel) => navigation.navigate('Character', { data: character });
  const goToCreatorDetail = (creator: CreatorModel) => navigation.navigate('Creator', { data: creator });
  const goToEventDetail = (event: EventsModel) => navigation.navigate('Event', { data: event });
  const goToStoryDetail = (story: StoriesModel) => navigation.navigate('Story', { data: story });

  useEffect(() => {
    getCharacters();
    getCreators();
    getEvents();
    getStories();

    return () => {
      setCharacters([]);
      setCharactersLoading(false);
      setCreators([]);
      setCreatorsLoading(false);
      setEvents([]);
      setEventsLoading(false);
      setStories([]);
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
          {renderCharacters()}
          {renderCreators()}
          {renderEvents()}
          {renderStories()}
          {renderImages()}
          <View style={styles.MiscView}>
            <Text style={styles.MiscTitle}>Misc Information</Text>
            <Text style={styles.MiscText}>
              Digital ID: <Text style={styles.MiscTextData}>{comic.digitalId ? comic.digitalId : 'N/A'}</Text>
            </Text>
            <Text style={styles.MiscText}>
              Issue number: <Text style={styles.MiscTextData}>{comic.issueNumber ? comic.issueNumber : 'N/A'}</Text>
            </Text>
            <Text style={styles.MiscText}>
              Variant description: <Text style={styles.MiscTextData}>{comic.variantDescription ? comic.variantDescription : 'N/A'}</Text>
            </Text>
            <Text style={styles.MiscText}>
              Modified: <Text style={styles.MiscTextData}>{comic.modified ? comic.modified : 'N/A'}</Text>
            </Text>
            <Text style={styles.MiscText}>
              ISBN: <Text style={styles.MiscTextData}>{comic.isbn ? comic.isbn : 'N/A'}</Text>
            </Text>
            <Text style={styles.MiscText}>
              ISSN: <Text style={styles.MiscTextData}>{comic.issn ? comic.issn : 'N/A'}</Text>
            </Text>
            <Text style={styles.MiscText}>
              UPC: <Text style={styles.MiscTextData}>{comic.upc ? comic.upc : 'N/A'}</Text>
            </Text>
            <Text style={styles.MiscText}>
              Diamond code: <Text style={styles.MiscTextData}>{comic.diamondCode ? comic.diamondCode : 'N/A'}</Text>
            </Text>
            <Text style={styles.MiscText}>
              EAN: <Text style={styles.MiscTextData}>{comic.ean ? comic.ean : 'N/A'}</Text>
            </Text>
            <Text style={styles.MiscText}>
              Format: <Text style={styles.MiscTextData}>{comic.format ? comic.format : 'N/A'}</Text>
            </Text>
            <Text style={styles.MiscText}>
              Page count: <Text style={styles.MiscTextData}>{comic.pageCount ? comic.pageCount : 'N/A'}</Text>
            </Text>
            <Text style={styles.MiscText}>
              Resource URI: <Text style={styles.MiscTextData}>{comic.resourceURI ? comic.resourceURI : 'N/A'}</Text>
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
    backgroundColor: whiteColor
  },
  MiscView: {
    marginTop: 16,
    padding: 16,
    backgroundColor: whiteColor,
    borderRadius: 8,
    shadowColor: blackColor,
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
  }
});

export default Comic;