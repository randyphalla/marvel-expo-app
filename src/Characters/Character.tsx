import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import md5 from 'md5';
import { privateKey, publicKey } from '../../src/shared/apiKey';
import { ComicSummary, EventSummary, SeriesSummary, StorySummary } from '../models/CharacterModel';

export default function Character({navigation, route}) {
  const character = route.params.data;

  function secretHashKey(url: string, type: string) {
    const ts = new Date().getTime();
    const stringToHash = ts + privateKey + publicKey;
    const hash = md5(stringToHash);
    const limit = 20;
    const specialUrl = `${url}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;

    redirectToPage(specialUrl, type);
  }

  function redirectToPage(specialUrl: string, screenType: string) {
    if (screenType === 'comics') {
      navigation.navigate('Comic', {url: specialUrl});
    } else if (screenType === 'events') {
      navigation.navigate('Event', {url: specialUrl});
    }  else if (screenType === 'series') {
      navigation.navigate('serie', {url: specialUrl});
    }  else if (screenType === 'story') {
      navigation.navigate('Story', {url: specialUrl});
    }
  }

  async function getComic(url: string) {
    secretHashKey(url, 'comics');
  }

  async function getEvent(url: string) {
    secretHashKey(url, 'events');
  }
  
  async function getSerie(url: string) {
    secretHashKey(url, 'series');
  }

  async function getStory(url: string) {
    secretHashKey(url, 'story');
  }

  return (
    <SafeAreaView style={styles.characterSafeAreaView}>

      <ScrollView>
      
        <View style={styles.characterImageContainer}>
          <Image 
            style={styles.characterImage}
            source={{uri: character.thumbnail.path + '.' + character.thumbnail.extension}} 
            resizeMode="cover"
          />
        </View>

        <View style={styles.characterInfo}>
          <Text style={styles.characterText}>{ character.name }</Text>
          {
            character.description ? (
              <Text style={styles.characterDescriptionText}>{ character.description }</Text>
            ) : null
          }
        </View>
        
        <View style={styles.characterItemsContainer}>

          <View style={styles.characterItem}>
            <Text style={styles.characterItemTitle}>Comics</Text>
            {
              character.comics.items.map((comic: ComicSummary, i: number) => (
                <TouchableOpacity style={styles.characterItemButton} key={i} onPress={() => getComic(comic.resourceURI)}>
                  <Text style={styles.characterItemText}>{ comic.name }</Text>
                </TouchableOpacity>
              ))
            }
          </View>
          
          <View style={styles.characterItem}>
            <Text style={styles.characterItemTitle}>Events</Text>
              {
                character.events.items.map((event: EventSummary, i: number) => (
                  <TouchableOpacity style={styles.characterItemButton} key={i} onPress={() => getEvent(event.resourceURI)}>
                    <Text style={styles.characterItemText}>{ event.name }</Text>
                  </TouchableOpacity>
                ))
              }
          </View>

          <View style={styles.characterItem}>
            <Text style={styles.characterItemTitle}>Series</Text>
              {
                character.series.items.map((series: SeriesSummary, i: number) => (
                  <TouchableOpacity style={styles.characterItemButton} key={i} onPress={() => getSerie(series.resourceURI)}>
                    <Text style={styles.characterItemText}>{ series.name }</Text>
                  </TouchableOpacity>
                ))
              }
          </View>

          <View style={styles.characterItem}>
            <Text  style={styles.characterItemTitle}>Stories</Text>
            {
              character.stories.items.map((story: StorySummary, i: number) => (
                <TouchableOpacity style={styles.characterItemButton} key={i} onPress={() => getStory(story.resourceURI)}>
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
  characterImageContainer: {},
  characterImage: {
    width: '100%',
    height: 350
  },
  characterInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: -30,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 4,
  },
  characterText: {
    color: '#202020',
    fontSize: 20,
    fontWeight: '800'
  },
  characterDescriptionText: {
    marginTop: 12,
    color: '#202020',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 18
  },
  characterItemsContainer: {
    padding: 16
  },
  characterItem: {
    marginTop: 6,
    marginBottom: 6
  },
  characterItemTitle: {
    // color: '#e62429',
    color: '#202020',
    marginBottom: 6,
    fontSize: 24,
    fontWeight: '800'
  },
  characterItemButton: {
    padding: 6,
    marginTop: 3,
    marginBottom: 3,
  },
  characterItemText: {
    color: '#202020',
    fontSize: 14,
    fontWeight: '400'
  },
});