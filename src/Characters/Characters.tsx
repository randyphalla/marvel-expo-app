import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import md5 from 'md5';

import DefaultItem from '../components/DefaultItem';
import { CharacterModel } from '../models/CharacterModel';

import { privateKey, publicKey } from '../../src/shared/apiKey';

const Characters = ({navigation}: any) => {
  const [characters, setCharacters] = useState<CharacterModel[]>([]);
  const [isCharactersLoading, setCharactersLoading] = useState<boolean>(true);

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

  const renderItem = ({item}: any) => (
    <DefaultItem 
      path={item.thumbnail.path}
      extension={item.thumbnail.extension}
      name={item.name}
      description={item.description}
      onPress={() => goToCharacterPage(item)}
    />    
  );

  useEffect(() => {
    getCharacters();
    
    return () => {
      setCharacters([]);
      setCharactersLoading(false);
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={{padding: 13}}>
        <FlatList 
          data={characters}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  )
};

export default Characters;