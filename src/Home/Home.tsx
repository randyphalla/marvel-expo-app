import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import HomeCard from '../components/HomeCard';

const Home = ({navigation}: any) => {
  const goToCharacters = () => navigation.navigate('Characters');
  const goToComics = () => navigation.navigate('Comics');
  const goToCreators = () => navigation.navigate('Creators');
  const goToEvents = () => navigation.navigate('Events');
  const goToSeries = () => navigation.navigate('Series');
  const goToStories = () => navigation.navigate('Stories');

  return (
    <SafeAreaView>
      <ScrollView style={styles.HomeScrollView}>
        <View style={styles.HomeView}>
          <HomeCard 
            text="Characters"
            image="https://terrigen-cdn-dev.marvel.com/content/prod/1x/blackpanther_01-1920x1080.jpg"
            onPress={goToCharacters}
          />
          <HomeCard 
            text="Comics"
            image="https://terrigen-cdn-dev.marvel.com/content/prod/1x/doctorstrange_01-1920x1080_copy.jpg"
            onPress={goToComics}
          />
          <HomeCard 
            text="Creators"
            image="https://terrigen-cdn-dev.marvel.com/content/prod/1x/thor_02-1920x1080.jpg"
            onPress={goToCreators}
          />
          <HomeCard 
            text="Events"
            image="https://terrigen-cdn-dev.marvel.com/content/prod/1x/a33.jpg"
            onPress={goToEvents}
          />
          <HomeCard 
            text="Series"
            image="https://terrigen-cdn-dev.marvel.com/content/prod/1x/a22.jpg"
            onPress={goToSeries}
          />
          <HomeCard 
            text="Stories"
            image="https://terrigen-cdn-dev.marvel.com/content/prod/1x/a44.jpg"
            onPress={goToStories}
          />        
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  HomeScrollView: {
    height: '100%',
    backgroundColor: '#F1F4FA'
  },
  HomeView: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    padding: 13
  }
});

export default Home;