import React from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  StyleSheet 
} from 'react-native';
import HomeCard from '../components/HomeCard';


export default function Home({navigation}: any) {
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
            onPress={goToCharacters}
          />
          <HomeCard 
            text="Comics"
            onPress={goToComics}
          />
          <HomeCard 
            text="Creators"
            onPress={goToCreators}
          />
          <HomeCard 
            text="Events"
            onPress={goToEvents}
          />
          <HomeCard 
            text="Series"
            onPress={goToSeries}
          />
          <HomeCard 
            text="Stories"
            onPress={goToStories}
          />        
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  HomeScrollView: {
    height: '100%'
  },
  HomeView: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    padding: 13
  }
});