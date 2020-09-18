import React, { useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import md5 from 'md5';
import { ComicModel } from '../models/ComicsModel';
import { privateKey, publicKey } from '../shared/apiKey';
import DefaultItem from '../components/DefaultItem';

export default function Comics({navigation}: any) {
  const [isComicsLoading, setComicsLoading] = useState(true);
  const [comics, setComics] = useState<ComicModel[]>([]);

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

  const renderComics = () => {
    return (
      <View>
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
    )
  }

  useEffect(() => {
    getComics();

    return () => {
      setComics([]);
      setComicsLoading(false);
    } 
  }, []);

  return (
    <SafeAreaView style={{ flexDirection:'column', flex: 1, width: '100%'}}>
      <ScrollView 
        style={{backgroundColor: isComicsLoading ? '#E00304' : '#ffffff'}} 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}
      >
          {
            isComicsLoading ? (
              <View style={styles.LoadingView}>
                <Text style={styles.LoadingViewText}>Comics is Loading</Text>
              </View>
            ) : (
              renderComics()
            )
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
  }
});
