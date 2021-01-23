import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View, Text } from 'react-native';
import md5 from 'md5';

import DefaultItem from '../components/DefaultItem';
import { SeriesModel } from '../models/SeriesModel';
import { privateKey, publicKey } from '../shared/apiKey';

const Series = ({navigation}: any) => {
  const [series, setSeries] = useState<SeriesModel[]>([]);
  const [seriesLoading, setSeriesLoading] = useState<boolean>(false);

  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/series';
  const url = `${baseUrl}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;

  const getSeries = async () => { 
    try {
      let res = await fetch(url);
      let json = await res.json();

      if (json && json.data && json.data.results) {
        setSeries(json.data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSeriesLoading(true);
    }
  }

  const goToSeriesPage = (serie: SeriesModel) => navigation.navigate('Serie', {data: serie});

  const renderItem = ({item}: any) => (
    <DefaultItem 
      path={item.thumbnail.path}
      extension={item.thumbnail.extension}
      name={item.title}
      description={item.description}
      onPress={() => goToSeriesPage(item)}
    />   
  );

  const renderSeries = () => {
    if (series && seriesLoading) {
      return (
        <FlatList 
          data={series}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )
    } else {
      return (
        <Text>Series is loading</Text>
      )
    }
  }

  useEffect(() => {
    getSeries();

    return () => {
      setSeries([]);
      setSeriesLoading(true);
    }
  }, []);
  
  return (
    <SafeAreaView>
      <View style={{padding: 13}}>
        {renderSeries()}
      </View>
    </SafeAreaView>
  )
}

export default Series;