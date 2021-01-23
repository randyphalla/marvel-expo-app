import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View, Text } from 'react-native';
import md5 from 'md5';

import DefaultItem from '../components/DefaultItem';
import { EventsModel } from '../models/EventsModel';
import { privateKey, publicKey } from '../shared/apiKey';

const Events = ({navigation}: any) => {
  const [events, setEvents] = useState<EventsModel[]>([]);
  const [eventsLoading, setEventsLoading] = useState<boolean>(false);

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
      setEventsLoading(true);
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

  const renderEvents = () => {
    if (events && eventsLoading) {
      return (
        <FlatList 
          data={events}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )
    } else {
      return (
        <Text>Events is loading</Text>
      )
    }
  }

  useEffect(() => {
    getEvents();
    
    return () => {
      setEvents([]);
      setEventsLoading(false);
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={{padding: 13}}>
        {renderEvents()}
      </View>
    </SafeAreaView>
  )
}

export default Events;