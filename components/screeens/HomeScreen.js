import {View, Text, Platform, ScrollView} from 'react-native'
import React,{useEffect} from 'react'
import { tailwind } from 'react-native-tailwindcss'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassCircleIcon } from 'react-native-heroicons/outline'
import { TouchableOpacity } from 'react-native'
import TrendingMovies from '../trendingMovies/TrendingMovies'
import { useState } from 'react'
import MovieList from '../movieList/MovieList'
import { useNavigation } from '@react-navigation/native'
import Loading from './Loading'
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../../api/Moviedb'


const ios = Platform.OS == 'ios';
export default function HomeScreen(){
    const [trending,setTrending] = useState([]);
    const [Upcoming,setUpcoming] = useState([]);
    const [topRated,setTopRated] = useState([]);
    const [loading,setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(()=>{
       getTrendingMovies();
       getUpcomingMovies();
       getTopRatedMovies();
    },[])
    
    const getTrendingMovies = async ()=>{
        const data = await fetchTrendingMovies();
        // console.log('got upcoming movies:',data);
        if(data && data.results) setTrending(data.results);
        setLoading(false);
    }

    const getUpcomingMovies = async ()=>{
        const data = await fetchUpcomingMovies();
        console.log('got upComing movies:',data);
        if(data && data.results) setUpcoming(data.results);
        // setLoading(false);
    }

    const getTopRatedMovies = async ()=>{
        const data = await fetchTopRatedMovies();
        if(data && data.results) setTopRated(data.results);
       
    }
    return(
        <View style={[tailwind.flex1,tailwind.bgGray900]}>
            {/* <Text style={[tailwind.textLg,tailwind.textRed900,{ marginTop: 100 }]}>
                HOMESCREEN
            </Text> */}
            <SafeAreaView style={ios ? [tailwind.mb-2] : [tailwind.mb-3]}>
             <StatusBar style={[tailwind.bgWhite]}/>
             <View style={[tailwind.flexRow, tailwind.justifyBetween,tailwind.itemsCenter,tailwind.mL10]}>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
            <Text
                style={[tailwind.textWhite,tailwind.justifyCenter,tailwind.mL10,tailwind.fontBold]}>
            <Text

              Zone style={[tailwind.textYellow900]}>ZONE</Text>Movies
              </Text>
              <TouchableOpacity style={[tailwind.m10]} onPress={()=>navigation.navigate('Search')}>
                   <MagnifyingGlassCircleIcon size="30" strokeWidth={2} color="white" />
              </TouchableOpacity>
             </View>
            </SafeAreaView>
             
             {
                loading?(
                   <Loading/>
                ):(
                    <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[tailwind.pB10]}
            >

            {trending.length>0 && <TrendingMovies data={trending}/>}

            <MovieList title="Upcoming" data={Upcoming} />
            <MovieList title="Top Rated" data={topRated} />
            

            </ScrollView>
                )
             }
        </View>
    )
}