import React, { useState, useEffect} from 'react';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import md5 from 'md5';

import DefaultItem from '../../components/DefaultItem';
import { ComicModel } from '../../models/ComicsModel';
import { privateKey, publicKey } from '../../shared/apiKey';

const Comics = ({navigation}: any) => {
  const [comics, setComics] = useState<ComicModel[]>([]);
  const [comicsLoading, setComicsLoading] = useState<boolean>(false);

  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
  const url = `${baseUrl}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;

  const getComics = async () => {
    try {
      let res = await fetch(url)
      let json = await res.json();
      if (json && json.data && json.data.results) {
        setComics(json.data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setComicsLoading(true);
    }
  }

  const goToComicPage = (comic: ComicModel) => navigation.navigate('Comic', {data: comic});
  
  const renderItem = ({item}: any) => (
    <DefaultItem 
      path={item.thumbnail.path}
      extension={item.thumbnail.extension}
      name={item.title}
      onPress={() => goToComicPage(item)}
    />    
  );

  const renderComics = () => {
    if (comics && comicsLoading) {
      return (
        <FlatList 
          data={comics}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )
    } else {
      return (
        <Text>Comics is loading</Text>
      )
    }
  }

  useEffect(() => {
    getComics();

    return () => {
      setComics([]);
      setComicsLoading(false);
    } 
  }, []);

  return (
    <SafeAreaView>
      <View style={{padding: 13}}>
        {renderComics()}
      </View>
    </SafeAreaView>
  )
};

export default Comics;