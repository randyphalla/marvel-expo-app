import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, FlatList } from 'react-native';
import md5 from 'md5';

import DefaultItem from '../components/DefaultItem';
import { CreatorModel } from '../models/CreatorsModel';
import { privateKey, publicKey } from '../shared/apiKey';

const Creators = ({navigation}: any) => {
  const [creators, setCreators] = useState<CreatorModel[]>([]);
  const [isCreatorsLoading, setCreatorsLoading] = useState<boolean>(true);

  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/creators';
  const url = `${baseUrl}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;

  const getCreators = async () => { 
    try {
      let res = await fetch(url);
      let json = await res.json();

      if (json && json.data && json.data.results) {
        setCreators(json.data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCreatorsLoading(false);
    }
  }

  const goToCreatorPage = (creator: CreatorModel) => navigation.navigate('Creator', {data: creator});
  
  const renderItem = ({item}: any) => (
    <DefaultItem 
      path={item.thumbnail.path}
      extension={item.thumbnail.extension}
      name={item.fullName}
      onPress={() => goToCreatorPage(item)}
    />   
  );

  useEffect(() => {
    getCreators();

    return () => {
      setCreators([]);
      setCreatorsLoading(true);
    }
  }, []);
  
  return (
    <SafeAreaView>
      <View style={{padding: 13}}>
        <FlatList 
          data={creators}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  )
}

export default Creators;