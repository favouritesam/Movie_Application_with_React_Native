import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native';
import { View, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { tailwind, theme } from 'react-native-tailwindcss'
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';
import { HeartIcon } from 'react-native-heroicons/solid'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../cast/Cast';
import MovieList from '../movieList/MovieList';
import Loading from './Loading';
import { fallbackMoviePoster, fallbackPersonImage, fetchMovieCredits, fetchMoviesDetails, fetchSimilarMovie, fetchSimilarMovies, image500 } from '../../api/Moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : [tailwind.mT10];

export default function MovieScreen() {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie,setMovie]= useState({});

 
  useEffect(() => {
    // console.log('itemid:',item.id);
    setLoading(true);
    getMovieDetials(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetials = async id=>{
    const data = await fetchMoviesDetails(id);
    // console.log('movies:',data)
    if(data) setMovie(data);
    setLoading(false)
  }

  const getMovieCredits = async id=>{
    const data = await fetchMovieCredits(id);
    // console.log('movie credits data:',data)
    if(data && data.cast) setCast(data.cast);
  }
  const getSimilarMovies = async id =>{
    const data = await fetchSimilarMovies(id);
    if(data && data.results) setSimilarMovies(data.results);
  }
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={[tailwind.bgGray900, tailwind.flex1,]}
    >
      <View style={[tailwind.wFull]}>
        <SafeAreaView style={[{ zIndex: 20 }, tailwind.absolute, tailwind.wFull, tailwind.flexRow, tailwind.justifyBetween, tailwind.itemsCenter, tailwind.pX10, +topMargin]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[tailwind.p1, tailwind.bgYellow500, { borderRadius: 15 }, { marginLeft: 15 }]}>
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} style={{ marginRight: 20 }}>
            <HeartIcon size='35' color={isFavourite ? theme.bacdkgroun : "white"} />
          </TouchableOpacity>
        </SafeAreaView>

        {
          loading ? (
            <Loading /> 
          ) : (
            <View>
              <Image
                // source={require('../../assets/images/antman.jpg')}
                source={{uri: image500(movie?. poster_path) || fallbackMoviePoster}}
                style={[{ width, height: height * 0.75 }]}
              />
 
              <LinearGradient
                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                style={[
                  tailwind.absolute,
                  tailwind.bottom0,
                  { width, height: height * 0.40 },
                ]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
            </View>
          )
        }

      </View>

      <View
        //   style={[{marginTop:-(height*0.00)},tailwind.mt4]} >
        style={[{ marginTop: -(height * 0.09) }, tailwind._mT3]}>
        <Text style={[tailwind.textWhite, tailwind.textCenter, tailwind.text3xl, tailwind.fontBold, tailwind.trackingWider]}>
          {
            movie?.title
          }
          </Text>
          {
            movie?.id?(
              <Text style={[tailwind.textGray400, tailwind.fontSemibold, tailwind.textBase, tailwind.textCenter, tailwind.mT4]}>
          {movie?.status} . {movie?.release_date?.split('-')[0]} . {movie?.runtime} min
        </Text>
            ):null
          }
        
        

        <View style={[tailwind.flexRow, tailwind.justifyCenter, tailwind.mX10, tailwind.spaceX2]}>
            {
              movie?.genres?.map((genre, index)=>{
                let showDot = index+1 != movie.genres.length;
                return (
                 <Text key={index} style={[tailwind.spaceX2,tailwind.textGray400, tailwind.fontSemibold, tailwind.textBase, tailwind.textCenter, tailwind.mT4]}>
                   {genre?.name} {showDot? ".": null}
          </Text>
                )
              })
            }
            {/* <Text style={[tailwind.textGray400, tailwind.fontSemibold, tailwind.textBase, tailwind.textCenter, tailwind.mT4]}>
            Action .
          </Text>
          <Text style={[tailwind.textGray400, tailwind.fontSemibold, tailwind.textBase, tailwind.textCenter, tailwind.mT4]}>
            Thrill .
          </Text>
          <Text style={[tailwind.textGray400, tailwind.fontSemibold, tailwind.textBase, tailwind.textCenter, tailwind.mT4]}>
            Comedy
          </Text> */}
        </View>
        <Text style={[tailwind.textGray400, tailwind.mX4, tailwind.trackingWide, tailwind.mT5]}>
             {
              movie?.overview
             }
        </Text>
      </View>

      {cast.length>0 && <Cast navigation={navigation} cast={cast}/>}
      <View style={[]}>
       {similarMovies.length>0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />}
      </View>
    </ScrollView>

  )
}



