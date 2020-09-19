import md5 from 'md5';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
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

  useEffect(() => {
    getEvents();

    return () => {
      setEvents([]);
      setEventsLoading(true);
    }
  }, []);

  console.log(events);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 13}}>
          <Text>Events</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Events;