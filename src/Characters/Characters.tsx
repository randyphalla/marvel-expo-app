import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { privateKey, publicKey } from '../../src/shared/apiKey';
import md5 from 'md5';
import { CharacterModel } from '../models/CharacterModel';

export default function Characters() {
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


  function renderCharactersItem(char: CharacterModel) {
    return (
      <View>
        <Text>{char.name}</Text>
      </View>
    )
  }


  useEffect(() => {
    getChars();
  }, []);

  return (
    <View>
      {
        isCharactersLoading 
        ? (<Text>Characters is loading...</Text>) 
        : (
          <View>
            {
              characters.map((item: CharacterModel, i) => (
                <View key={i}>
                  <Text>{item.name}</Text>
                </View>
              ))
            }
          </View>
        )
      }
    </View>
  )
};