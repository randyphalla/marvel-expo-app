import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { privateKey, publicKey } from '../../src/shared/apiKey';
import md5 from 'md5';
import { CharacterModel } from '../models/CharacterModel';
import DefaultItem from '../components/DefaultItem';

export default function Characters({navigation}: any) {
  const [characters, setCharacters] = useState<CharacterModel[]>([]);
  const [isCharactersLoading, setCharactersLoading] = useState(true);

  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
  const url = `${baseUrl}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;

  const getCharacters = async () => {
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
    
  const goToCharacterPage = (character: CharacterModel) => navigation.navigate('Character', {data: character});

  const renderCharactersIsLoading = () => {
    return (
      <View style={styles.LoadingView}>
        <Text style={styles.LoadingViewText}>Characters is Loading</Text>
      </View>
    )
  }

  const renderCharacters = () => {
    return (
      <View style={styles.characterList}>
        {
          characters.map((item: CharacterModel, index: number) => (
            <DefaultItem 
              key={index}
              path={item.thumbnail.path}
              extension={item.thumbnail.extension}
              name={item.name}
              description={item.description}
              onPress={() => goToCharacterPage(item)}
            />
          ))
        }
      </View>
    )
  }

  useEffect(() => {
    getCharacters();
    
    return () => {
      setCharacters([]);
      setCharactersLoading(false);
    }
  }, []);

  return (
    <SafeAreaView style={styles.characterContainer}>
      <ScrollView
        style={{backgroundColor: isCharactersLoading ? '#E00304' : '#ffffff'}} 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}
      >
        {
          isCharactersLoading 
            ? renderCharactersIsLoading() 
            : renderCharacters()
        }
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  LoadingView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoadingViewText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  characterContainer: {
    flexDirection:'column',
    flex: 1,
    width: '100%'
  },
  characterList: {
    paddingLeft: 13,
    paddingRight: 13
  }
});