import React, { useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import md5 from 'md5';

import DefaultItem from '../components/DefaultItem';
import { ComicModel } from '../models/ComicsModel';
import { privateKey, publicKey } from '../shared/apiKey';
import { whiteColor } from '../styles';

const Comics = ({navigation}: any) => {
  const [comics, setComics] = useState<ComicModel[]>([]);
  const [isComicsLoading, setComicsLoading] = useState<boolean>(true);

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
      setComicsLoading(false);
    }
  }

  const goToComicPage = (comic: ComicModel) => navigation.navigate('Comic', {data: comic});
  
  useEffect(() => {
    getComics();

    return () => {
      setComics([]);
      setComicsLoading(false);
    } 
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          {
            comics.map((comic, index) => 
              <DefaultItem 
                key={index}
                path={comic.thumbnail.path}
                extension={comic.thumbnail.extension}
                name={comic.title}
                onPress={() => goToComicPage(comic)}
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
    color: whiteColor,
    fontSize: 20,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1
  }
});

export default Comics;