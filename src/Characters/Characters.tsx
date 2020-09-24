import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import md5 from 'md5';

import DefaultItem from '../components/DefaultItem';
import { CharacterModel } from '../models/CharacterModel';
import { privateKey, publicKey } from '../../src/shared/apiKey';

const Characters = ({navigation}: any) => {
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

  // const renderCharactersIsLoading = () => {
  //   return (
  //     <View style={styles.LoadingView}>
  //       <Text style={styles.LoadingViewText}>Characters is Loading</Text>
  //     </View>
  //   )
  // }

  useEffect(() => {
    getCharacters();
    
    return () => {
      setCharacters([]);
      setCharactersLoading(false);
    }
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          {
            characters.map((item: CharacterModel, index: number) => 
              <DefaultItem 
                key={index}
                path={item.thumbnail.path}
                extension={item.thumbnail.extension}
                name={item.name}
                description={item.description}
                onPress={() => goToCharacterPage(item)}
              />
            )
          }
        </View>
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
  }
});

export default Characters;