import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { privateKey, publicKey } from '../../src/shared/apiKey';
import md5 from 'md5';
import { CharacterModel } from '../models/CharacterModel';

export default function Characters({navigation}) {
  const [isCharactersLoading, setCharactersLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
  const limit = 20;
  const url = `${baseUrl}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;

  async function getChars() {
    try {
      let res = await fetch(url)
      let json = await res.json();
      if (json && json.data && json.data.results) {
        setCharacters(json.data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCharactersLoading(false);
    }
  }

  useEffect(() => {
    getChars();
    return () => {
      setCharacters([]);
      setCharactersLoading(false);
    }
  }, []);
  

  function goToCharacterPage(char: CharacterModel) {
    navigation.navigate('Character', {data: char});
  }

  return (
    <SafeAreaView style={styles.characterContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Characters</Text>
      </View>
      {
        isCharactersLoading 
        ? (
          <ScrollView style={styles.characterList}>
            <Text style={styles.isLoadingText}>Characters is loading...</Text>
          </ScrollView>
        ) 
        : (
          <ScrollView style={styles.characterList}>
            {
              characters.map((item: CharacterModel, i) => (
                <TouchableOpacity style={styles.characterItem} key={i} onPress={() => goToCharacterPage(item)}>
                  <Image 
                    style={styles.characterItemImage} 
                    source={{uri: item.thumbnail.path + '.' + item.thumbnail.extension}} 
                    resizeMode="cover"
                  />
                  <View style={styles.characterItemContent}>
                    <Text style={styles.characterItemText}>{item.name}</Text>
                    {
                      item.description ? (
                        <View style={styles.characterItemDesc}>
                          <Text style={styles.characterItemDescText} numberOfLines={4}>{item.description}</Text> 
                        </View>
                      ) : null
                    }
                  </View>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        )
      }
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  characterContainer: {
    flexDirection:'column',
    flex: 1,
    width: '100%'
  },
  header: {
    padding: 16
  },
  headerText: {
    color: '#060606',
    fontSize: 30,
    fontWeight: '800'
  },
  isLoadingText: {
    color: '#060606',
    fontSize: 16,
    fontWeight: '800'
  },
  characterList: {
    paddingLeft: 13,
    paddingRight: 13
  },
  characterItem: {
    paddingTop: 10,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E2F3'
  },
  characterItemImage: {
    height: 80,
    width: 100,
    marginRight: 10,
    borderRadius: 6
  },
  characterItemContent: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  characterItemText: {
    color: '#060606',
    fontSize: 16,
    fontWeight: '800'
  },
  characterItemDesc: {},
  characterItemDescText: {
    marginTop: 6,
    color: '#060606',
    fontSize: 12,
    fontWeight: '400'
  }
});