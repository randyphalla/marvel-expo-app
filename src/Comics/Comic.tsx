import React, { useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';

export default function Comic({navigation, route}) {
  const comicURL = route.params.url;
  console.log(comicURL);

  const [comic, setComic] = useState([]);
  const [isComicLoading, setComicLoading] = useState(true);

  async function getComic() {
    try {
      let res = await fetch(comicURL)
      let json = await res.json();
      if (json && json.data && json.data.results) {
        setComic(json.data.results);
        console.log(comic);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getComic();

    return () => {
      setComic([]);
      setComicLoading(false);
    }
  }, []);


  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>{isComicLoading ? 'Comic is loading': 'Comic is here'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}