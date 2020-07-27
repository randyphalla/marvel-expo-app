import React from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet 
} from 'react-native';

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
          <TouchableOpacity style={styles.HomeButton} onPress={goToCharacters}>
            <Text style={styles.HomeButtonText}>Characters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.HomeButton} onPress={goToComics}>
            <Text style={styles.HomeButtonText}>Comics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.HomeButton} onPress={goToCreators}>
            <Text style={styles.HomeButtonText}>Creators</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.HomeButton} onPress={goToEvents}>
            <Text style={styles.HomeButtonText}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.HomeButton} onPress={goToSeries}>
            <Text style={styles.HomeButtonText}>Series</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.HomeButton} onPress={goToStories}>
            <Text style={styles.HomeButtonText}>Stories</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  HomeScrollView: {
    height: '100%',
    backgroundColor: 'pink'
  },
  HomeView: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%'
  },
  HomeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 80,  
    width: '50%',
    backgroundColor: 'blue'
  },
  HomeButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.3
  }
});