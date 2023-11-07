import { View, Text, Dimensions, TouchableWithoutFeedback ,Image} from 'react-native'
import React from 'react'
import { tailwind } from 'react-native-tailwindcss'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../../api/Moviedb';


var {width,height} = Dimensions.get('window');


export default function TrendingMovies({data}) {
    const navigation =useNavigation();
    const handleClick = (item)=>{
        navigation.navigate('Movie', item)
    }
  return (
    <View style={[tailwind.mB10]}>
      <Text style={[tailwind.textWhite,tailwind.mX4,tailwind.mB5]}>Trending</Text>
      <Carousel 
      data={data}
      renderItem={({item}) => <MovieCard item={item} handleClick = {handleClick}/>}
      firstItem={1}
      inactiveSlideOpacity={0.60}
      sliderWidth={width}
      itemWidth={width*0.62}
      slideStyle={{display:'flex',alignItems: 'center'}} />
    </View>
  )
}

const MovieCard = ({item,handleClick}) =>{
  // console.log('item.poster_path:',item.poster_path);
    return(
        <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
            <View style={[tailwind.rounded]}>
            <Image
            // source={require('../../assets/images/avengers.jpg')}
            source={{uri: image500(item.poster_path)}}
            style={{
                width: width *0.6,
                height: height * 0.4,
                borderRadius: 16
            }}
            />

            </View>
        </TouchableWithoutFeedback>
    )
}


