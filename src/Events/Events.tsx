import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import md5 from 'md5';

import DefaultItem from '../components/DefaultItem';
import { EventsModel } from '../models/EventsModel';
import { privateKey, publicKey } from '../shared/apiKey';

const Events = ({navigation}: any) => {
  const [events, setEvents] = useState<EventsModel[]>([]);
  const [isEventsLoading, setEventsLoading] = useState<boolean>(true);

  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/events';
  const url = `${baseUrl}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;

  const getEvents = async () => { 
    try {
      let res = await fetch(url);
      let json = await res.json();

      if (json && json.data && json.data.results) {
        setEvents(json.data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEventsLoading(false);
    }
  }

  const goToEventPage = (event: EventsModel) => navigation.navigate('Event', {data: event});

  const renderItem = ({item}: any) => (
    <DefaultItem 
      path={item.thumbnail.path}
      extension={item.thumbnail.extension}
      name={item.title}
      description={item.description}
      onPress={() => goToEventPage(item)}
    />   
  );

  useEffect(() => {
    getEvents();
    
    return () => {
      setEvents([]);
      setEventsLoading(true);
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={{padding: 13}}>
        <FlatList 
          data={events}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  )
}

export default Events;