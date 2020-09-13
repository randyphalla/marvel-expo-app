import React, { useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import md5 from 'md5';
import { ComicModel } from '../models/ComicsModel';
import { privateKey, publicKey } from '../shared/apiKey';

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
            <TouchableOpacity 
              style={styles.comicItem}
              key={index} 
              onPress={() => goToComicPage(comic)}
            >
              <View style={styles.comicItemImageView}>
                <Image 
                  style={styles.comicItemImage} 
                  source={{uri: comic.thumbnail.path + '.' + comic.thumbnail.extension}} 
                  resizeMode="cover"
                />
              </View>
              <View style={styles.comicItemViewText}>
                <View>
                  <Text style={styles.comicItemText}>{comic.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
      <ScrollView style={{ backgroundColor: '#ffffff'}}>
        <View>
          {
            isComicsLoading ? (
              <Text>Comics is Loading</Text>
            ) : (
              renderComics()
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  comicItem: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E2F3'
  },
  comicItemImageView: {
    marginRight: 8,
  },
  comicItemImage: {
    height: 150,
    width: 100,
    borderRadius: 8
  },
  comicItemViewText: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  comicItemText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 25
  }
})
