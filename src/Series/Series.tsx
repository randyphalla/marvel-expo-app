import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import md5 from 'md5';

import DefaultItem from '../components/DefaultItem';
import { SeriesModel } from '../models/SeriesModel';
import { privateKey, publicKey } from '../shared/apiKey';

const Series = ({navigation}: any) => {
  const [series, setSeries] = useState<SeriesModel[]>([]);
  const [isSeriesLoading, setSeriesLoading] = useState<boolean>(true);

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
      setSeriesLoading(false);
    }
  }

  const goToSeriesPage = (serie: SeriesModel) => navigation.navigate('Serie', {data: serie});

  useEffect(() => {
    getSeries();

    return () => {
      setSeries([]);
      setSeriesLoading(true);
    }
  }, []);
  
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          {
            series.map((serie, index) => 
              <DefaultItem 
                key={index}
                path={serie.thumbnail.path}
                extension={serie.thumbnail.extension}
                name={serie.title}
                description={serie.description}
                onPress={() => goToSeriesPage(serie)}
              />
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Series;