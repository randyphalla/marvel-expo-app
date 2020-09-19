import md5 from 'md5';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
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

  useEffect(() => {
    getCreators();

    return () => {
      setCreators([]);
      setCreatorsLoading(true);
    }
  }, []);

  console.log(creators);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          <Text>Creators</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Creators;