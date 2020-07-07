import React, { useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { ComicModel } from '../models/ComicsModel';
import BannerImage from '../components/BannerImage';
import BannerInfo from '../components/BannerInfo';

export type ComicProps = {
  navigation?: any;
  route?: any;
};

export default function Comic({navigation, route}: ComicProps) {

  const [comic, setComic] = useState<ComicModel>({} as ComicModel);
  const [isComicLoading, setComicLoading] = useState(true);
  
  const [ characters, setCharacters ] = useState([]);
  const [ isCharactersLoading, setCharactersLoading ] = useState(true);

  const [ creators, setCreators ] = useState([]);
  const [ isCreatorsLoading, setCreatorsLoading ] = useState(true);

  const [ events, setEvents ] = useState([]);
  const [ isEventsLoading, setEventsLoading ] = useState(true);

  const [ stories, setStories ] = useState([]);
  const [ isStoriesLoading, setStoriesLoading ] = useState(true);

  const [ images, setImages ] = useState([]);
  const [ isImagesLoading, setImagesLoading ] = useState(true);

  useEffect(() => {
    setComic(route.params.data);
    console.log(comic);

    return () => {
      setComic({} as ComicModel);
      setComicLoading(false);
    }
  }, []);


  return (
    <SafeAreaView>
      <ScrollView>
        
        {
          comic && comic.thumbnail ? (
            <BannerImage
              isComic={true}
              path={comic.thumbnail.path} 
              extension={comic.thumbnail.extension}
            ></BannerImage>
          ) : null
        }

        <BannerInfo 
          name={comic.title} 
          description={comic.description}
        ></BannerInfo>

      </ScrollView>
    </SafeAreaView>
  )
}