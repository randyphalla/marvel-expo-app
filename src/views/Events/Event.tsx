import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from 'react-native';
import md5 from 'md5';

import BannerImage from '../../components/BannerImage';
import BannerInfo from '../../components/BannerInfo';
import ImageCard from '../../components/ImageCard';
import SectionTitle from '../../components/SectionTitle';
import Link from '../../components/Link';

import { CharacterModel } from '../../models/CharacterModel';
import { ComicModel } from '../../models/ComicsModel';
import { CreatorModel } from '../../models/CreatorsModel';
import { SeriesModel } from '../../models/SeriesModel';
import { StoriesModel } from '../../models/StoriesModel';
import { privateKey, publicKey } from '../../shared/apiKey';
import { whiteColor } from '../../styles';

const Event = ({ navigation, route }: any) => {
  const event = route.params.data;

  const [characters, setCharacters] = useState<CharacterModel[]>([]);
  const [charactersLoading, setCharactersLoading] = useState<boolean>(false);

  const [comics, setComics] = useState<ComicModel[]>([]);
  const [comicsLoading, setComicsLoading] = useState<boolean>(false);

  const [creators, setCreators] = useState<CreatorModel[]>([]);
  const [creatorsLoading, setCreatorsLoading] = useState<boolean>(false);

  const [series, setSeries] = useState<SeriesModel[]>([]);
  const [seriesLoading, setSeriesLoading] = useState<boolean>(false);

  const [stories, setStories] = useState<StoriesModel[]>([]);
  const [storiesLoading, setStoriesLoading] = useState<boolean>(false);

  const charactersURLS: string[] = [];
  const charactersData: CharacterModel[] = [];

  const comicsURLS: string[] = [];
  const comicsData: ComicModel[] = [];

  const creatorsURLS: string[] = [];
  const creatorsData: CreatorModel[] = [];

  const seriesURLS: string[] = [];
  const seriesData: SeriesModel[] = [];

  const storiesURLS: string[] = [];
  const storesJSONData: any[] = [];
  const storiesData: StoriesModel[] = [];

  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = md5(stringToHash);

  const getCharacters = async () => {
    const comicCharacters = event.characters.items;

    for (const key in comicCharacters) {
      const specialUrl = `${comicCharacters[key].resourceURI}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
      charactersURLS.push(specialUrl);
    }

    for (const urls of charactersURLS) {
      let res = await fetch(urls);
      let json = await res.json();
      charactersData.push(json.data.results[0]);
    }

    setCharacters(charactersData);
    setCharactersLoading(true);
  };

  const getComics = async () => {
    const comicsItems = event.comics.items;

    for (const key in comicsItems) {
      const specialUrl = `${comicsItems[key].resourceURI}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
      comicsURLS.push(specialUrl);
    }

    for (const urls of comicsURLS) {
      let res = await fetch(urls);
      let json = await res.json();
      comicsData.push(json.data.results[0]);
    }

    setComics(comicsData);
    setComicsLoading(true);
  };

  const getCreators = async () => {
    const comicCreators = event.creators.items;

    for (const key in comicCreators) {
      const specialUrl = `${comicCreators[key].resourceURI}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
      creatorsURLS.push(specialUrl);
    }

    for (const urls of creatorsURLS) {
      let res = await fetch(urls);
      let json = await res.json();
      creatorsData.push(json.data.results[0]);
    }

    setCreators(creatorsData);
    setCreatorsLoading(true);
  };

  const getSeries = async () => {
    const seriesItems = event.series.items;

    for (const key in seriesItems) {
      const specialUrl = `${seriesItems[key].resourceURI}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
      seriesURLS.push(specialUrl);
    }

    for (const urls of seriesURLS) {
      let res = await fetch(urls);
      let json = await res.json();
      seriesData.push(json.data.results[0]);
    }

    setSeries(seriesData);
    setSeriesLoading(true);
  };

  const getStories = async () => {
    const storiesItems = event.stories.items;

    for (const key in storiesItems) {
      const specialUrl = `${storiesItems[key].resourceURI}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
      storiesURLS.push(specialUrl);
    }

    for (const urls of storiesURLS) {
      let res = await fetch(urls);
      let json = await res.json();
      if (json.data && json.data.results) {
        storesJSONData.push(json.data.results[0]);
      }
    }

    storesJSONData.map((res) => {
      storiesData.push(res);
    });

    setStories(storiesData);
    setStoriesLoading(true);
  };

  const getAllData = () => {
    getCharacters();
    getComics();
    getCreators();
    getSeries();
    getStories();
  };

  const returnAllData = () => {
    setCharacters([]);
    setCharactersLoading(false);
    setComics([]);
    setComicsLoading(false);
    setCreators([]);
    setCreatorsLoading(false);
    setSeries([]);
    setSeriesLoading(false);
    setStories([]);
    setStoriesLoading(false);
  };

  const goToCharacterDetail = (character: CharacterModel) =>
    navigation.navigate('Character', { data: character });
  const goToComicDetail = (comic: ComicModel) =>
    navigation.navigate('Comic', { data: comic });
  const goToCreatorDetail = (creator: CreatorModel) =>
    navigation.navigate('Creator', { data: creator });
  const goToSeriesDetail = (series: SeriesModel) =>
    navigation.navigate('Serie', { data: series });
  const goToStoryDetail = (story: StoriesModel) =>
    navigation.navigate('Story', { data: story });

  const renderCharacters = () => {
    if (characters && characters.length > 0 && charactersLoading) {
      return (
        <SectionTitle title="Characters">
          <View style={styles.ItemList}>
            {characters.map((character: CharacterModel, index: number) => (
              <ImageCard
                key={index}
                text={character.name}
                path={character.thumbnail.path}
                extension={character.thumbnail.extension}
                onPress={() => goToCharacterDetail(character)}
              />
            ))}
          </View>
        </SectionTitle>
      );
    }
  };

  const renderComics = () => {
    if (comics && comics.length > 0 && comicsLoading) {
      return (
        <SectionTitle title="Comics">
          <View style={styles.ItemList}>
            {comics.map((comic: ComicModel, index: number) => (
              <ImageCard
                key={index}
                text={comic.title}
                path={comic.thumbnail.path}
                extension={comic.thumbnail.extension}
                onPress={() => goToComicDetail(comic)}
              />
            ))}
          </View>
        </SectionTitle>
      );
    }
  };

  const renderCreators = () => {
    if (creators && creators.length > 0 && creatorsLoading) {
      return (
        <SectionTitle title="Creators">
          <View style={styles.ItemList}>
            {creators.map((creator: CreatorModel, index) => (
              <ImageCard
                key={index}
                text={creator.fullName}
                path={creator.thumbnail.path}
                extension={creator.thumbnail.extension}
                onPress={() => goToCreatorDetail(creator)}
              />
            ))}
          </View>
        </SectionTitle>
      );
    }
  };

  const renderSeries = () => {
    if (series && series.length > 0 && seriesLoading) {
      return (
        <SectionTitle title="Series">
          <View style={styles.ItemList}>
            {series.map((serie: SeriesModel, index: number) => (
              <ImageCard
                key={index}
                text={serie.title}
                path={serie.thumbnail.path}
                extension={serie.thumbnail.extension}
                onPress={() => goToSeriesDetail(serie)}
              />
            ))}
          </View>
        </SectionTitle>
      );
    }
  };

  const renderStories = () => {
    if (stories && stories.length > 0 && storiesLoading) {
      return (
        <SectionTitle title="Stories">
          {stories.map((story: StoriesModel, index: number) => (
            <Link
              key={index}
              text={story.title}
              onPress={() => goToStoryDetail(story)}
            />
          ))}
        </SectionTitle>
      );
    }
  };

  useEffect(() => {
    getAllData();

    return () => {
      returnAllData();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: whiteColor }}>
      <ScrollView>
        <BannerImage
          path={event.thumbnail.path}
          extension={event.thumbnail.extension}
        />
        <BannerInfo name={event.title} description={event.description} />
        <View
          style={{
            marginTop: 16,
            padding: 16,
            backgroundColor: whiteColor,
          }}
        >
          {renderCharacters()}
          {renderComics()}
          {renderCreators()}
          {renderSeries()}
          {renderStories()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ItemList: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
});

export default Event;
