import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Text } from 'react-native';
import HomeCard from '../../components/HomeCard';
import { blackColor } from '../../styles';

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
          <View style={styles.HomeWelcomeView}>
            <Text style={styles.HomeWelcomeTitle}>Welcome to Marvel Comics Guide.</Text>
            <Text style={styles.HomeWelcomeText}>Marvel Comics is the brand name and primary imprint of Marvel Worldwide Inc., formerly Marvel Publishing, Inc. and Marvel Comics Group, a publisher of American comic books and related media. In 2009, The Walt Disney Company acquired Marvel Entertainment, Marvel Worldwide's parent company.</Text>
          </View>
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
  },
  HomeWelcomeView: {
    marginTop: 40,
    marginBottom: 40
  },
  HomeWelcomeTitle: {
    marginBottom: 8,
    color: blackColor,
    fontSize: 26,
    fontWeight: '600'
  },
  HomeWelcomeText: {
    color: blackColor,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400'
  }
});

export default Home;