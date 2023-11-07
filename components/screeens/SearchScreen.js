import { Image, View, Text, Dimensions, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useState } from 'react'
import { tailwind } from 'react-native-tailwindcss';
import { XMarkIcon} from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash/debounce';

import Loading from './Loading';
import { fallbackMoviePoster, image185, image500, searcMovies } from '../../api/Moviedb';
// import { debounce } from '@mui/material';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResult] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);
  // let movieName = 'Ant-Man and the Wasp: Quantumania';

  const handleSearch = value=>{
    if(value && value.length>2){
      setLoading(true)
      searcMovies({
        query:value,
        include_adult: 'false',
        language:'en-US',page:'1',
      }).then(data=>{
        setLoading(false);
        // console.log('got movies:',data);
        if(data && data.results) setResult(data.results);
      })
    }else{
      setLoading(false);
      setResult([])
    }
  }
  const handleTextDebounce =useCallback(debounce(handleSearch,400),[]);
  return (
    <SafeAreaView style={[tailwind.bgGray900, tailwind.flex1]}>
      <View
        style={[tailwind.mX4, tailwind.mB3, tailwind.flexRow, tailwind.justifyBetween, tailwind.itemsCenter, tailwind.border2, tailwind.borderGray500, tailwind.roundedFull]}>
        <TextInput
        onChangeText={handleTextDebounce}
          placeholder='Search Movie'
          placeholderTextColor={'lightgray'}
          style={[tailwind.pB1, tailwind.pL6, tailwind.flex1, tailwind.textBase, tailwind.fontSemibold, tailwind.textWhite, tailwind.trackingWider]}
        />
        <TouchableOpacity
          onPress={() => { navigation.navigate('Home') }}
          style={[tailwind.roundedFull, tailwind.p3, tailwind.m1, tailwind.bgGray500]}
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {
        loading ? (
          <Loading />
        ) :
          results.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              style={[tailwind.spacingY3]}>
              <Text style={[tailwind.textWhite, tailwind.fontSemibold, tailwind.mL1]}>Results ({results.length})</Text>
              <View style={[tailwind.flexRow, tailwind.justifyBetween, tailwind.flexWrap]}>
                {
                  results.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() => navigation.push('Movie', item)}
                      >
                        <View style={[]}>
                          <Image
                            style={[
                              tailwind['rounded-3xl'],
                              {
                                width: width * 0.44,
                                height: height * 0.3,
                                borderRadius: 20,
                                marginTop: 10,
                              }
                            ]}
                            // source={require('../../assets/images/antman.jpg')}
                            source={{uri:image500(item?.poster_path) || fallbackMoviePoster}}
                          />
                          <Text style={[tailwind.textGray500, tailwind.mL1]}>
                            {
                              item?.title?.length>22? item?.title.slice(0,22)+'...': item?.title
                            }



                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  })
                }
              </View>
            </ScrollView>
          ) : (
            <View style={[tailwind.flexRow, tailwind.justifyCenter, tailwind.flexWrap]}>
              <Image source={require('../../assets/images/movieTime.jpg')}></Image>
            </View>
          )
      }


    </SafeAreaView>
  )
}