import React, { useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { ComicModel } from '../models/ComicsModel';
import BannerImage from '../components/BannerImage';
import BannerInfo from '../components/BannerInfo';

export default function Comic({navigation, route}) {

  // const comicUrl = route.params.url;
  const [comic, setComic] = useState<ComicModel>({} as ComicModel);
  const [isComicLoading, setComicLoading] = useState(true);

  // async function getComic() {
  //   try {
  //     let res = await fetch(comicUrl);
  //     let json = await res.json();
  //     if (json.data.results) {
  //       setComic(json.data.results[0]);
  //       console.log(comic);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setComicLoading(false);
  //   }
  // }

  useEffect(() => {
    // getComic();
    setComic(route.params.data);

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