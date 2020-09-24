import md5 from 'md5';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
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

  useEffect(() => {
    getEvents();
    
    return () => {
      setEvents([]);
      setEventsLoading(true);
    }
  }, []);

  return (
    <SafeAreaView style={{
      flexDirection:'column', 
      flex: 1, 
      width: '100%'
    }}>
      <ScrollView contentContainerStyle={{
        flexGrow: 1, 
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff'
      }}>
        <View style={{padding: 13}}>
          {
            events.map((event, index) => 
              <DefaultItem 
                key={index}
                path={event.thumbnail.path}
                extension={event.thumbnail.extension}
                name={event.title}
                description={event.description}
                onPress={() => goToEventPage(event)}
              />
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Events;