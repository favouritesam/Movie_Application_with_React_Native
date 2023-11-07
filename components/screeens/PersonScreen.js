import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { t, tailwind } from 'react-native-tailwindcss';
import { SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../movieList/MovieList';
import Loading from './Loading';
import { fallbackPersonImage, fetchMoviesDetails, fetchPersonDatails, fetchPersonMovies, image342 } from '../../api/Moviedb';


var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : (ios ? '' : 'm-3');
export default function PersonScreen() {

    const {params: item}= useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [person,setPerson]= useState({});
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
       setLoading(true);
    //    console.log('person:',item);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    },[item]);

    const getPersonDetails = async id=>{
        const data = await fetchPersonDatails(id);
        if(data) setPerson(data);
        setLoading(false)
    }

    const getPersonMovies = async id =>{
        const data = await fetchPersonMovies(id);
        if(data&& data.cast) setPersonMovies(data.cast);
       
    }
    return (
        <ScrollView style={[tailwind.flex1, tailwind.bgGray900]} contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView style={[{ zIndex: 20 }, tailwind.absolute, tailwind.wFull, tailwind.flexRow, tailwind.justifyBetween, tailwind.itemsCenter, tailwind.pX10, +verticalMargin]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[tailwind.p1, tailwind.bgYellow500, { borderRadius: 15 }, { marginLeft: 15 }]}>
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} style={{ marginRight: 20 }}>
                    <HeartIcon size='35' color={isFavourite ? 'red' : "white"} />
                </TouchableOpacity>
            </SafeAreaView>

            {
                loading?(
                    <Loading/>
                ):(
                    <View>
                <View style={[
                    tailwind.flexRow,
                    tailwind.justifyCenter,
                    { marginTop: 130 },
                    {
                        shadowColor: 'gray',
                        shadowRadius: 40,
                        shadowOffset: { width: 0, height: 5 },
                        // shadowOpacity: 1,
                    }
                ]}>
                    <View style={[
                        tailwind.itemsCenter,
                        tailwind.roundedFull,
                        tailwind.overflowHidden,
                        tailwind.h72,
                        tailwind.w72,
                        tailwind.borderGray500,
                        tailwind.border2,
                        
                    ]}>
                        <Image
                            // source={require('../../assets/images/johnwick.jpeg')}
                            source={{uri:image342(person?.profile_path) || fallbackPersonImage}}
                            style={{ height: height * 0.43, width: width * 0.74 }}
                        />
                    </View>
                </View>

                <View style={[tailwind.mT6]}>
                    <Text style={[tailwind.text3xl, tailwind.textWhite, tailwind.fontBold, tailwind.textCenter]}>
                        {
                           person?.name 
                        }
                    </Text>
                    <Text style={[tailwind.textBase, tailwind.textGray800, tailwind.fontBold, tailwind.textCenter]}>
                        {
                          person?.place_of_birth  
                        }
                    </Text>
                </View>

                <View style={[tailwind.p4, tailwind.mT6, tailwind.mX3, tailwind.flexRow, tailwind.justifyBetween, tailwind.itemsCenter, tailwind.bgGray700, tailwind.roundedFull]}>
                    <View style={[
                        tailwind.borderR2,
                        tailwind.borderGray400,
                        tailwind.pX2,
                        tailwind.itemsCenter
                    ]}>

                        <Text style={[tailwind.textWhite, tailwind.fontSemibold]}>
                            Gender
                        </Text>
                        <Text style={[tailwind.textGray500, tailwind.textSm]}>
                        {
                                person?.gender==1? 'Female':'Male'
                            }
                        </Text>
                    </View>

                    <View style={[
                        tailwind.borderR2,
                        tailwind.borderGray400,
                        tailwind.pX2,
                        tailwind.itemsCenter
                    ]}>

                        <Text style={[tailwind.textWhite, tailwind.fontSemibold]}>
                            Birthday
                        </Text>
                        <Text style={[tailwind.textGray500, tailwind.textSm]}>
                            {
                                person?.birthday
                            }
                        </Text>
                    </View>

                    <View style={[
                        tailwind.borderR2,
                        tailwind.borderGray400,
                        tailwind.pX2,
                        tailwind.itemsCenter
                    ]}>

                        <Text style={[tailwind.textWhite, tailwind.fontSemibold]}>
                            Known
                        </Text>
                        <Text style={[tailwind.textGray500, tailwind.textSm]}>
                           {
                            person?.known_for_department
                           }
                        </Text>
                    </View>

                    <View style={[
                        tailwind.borderR2,
                        tailwind.borderGray400,
                        tailwind.pX2,
                        tailwind.itemsCenter
                    ]}>

                        <Text style={[tailwind.textWhite, tailwind.fontSemibold]}>
                            Popularity
                        </Text>
                        <Text style={[tailwind.textGray500, tailwind.textSm]}>
                            {
                                person?.popularity?.toFixed(2)
                            }%
                        </Text>
                    </View>
                </View>

                <View style={[tailwind.mX4]}>
                    <Text style={[tailwind.textWhite, tailwind.textLg, tailwind.mT10]}>
                        Biography
                    </Text>
                    <Text style={[tailwind.textGray400, tailwind.trackingWide, { marginTop: 20 }]}> 
                         {
                            person?.biography || 'N/A'
                         }
                     </Text>
                </View>
                <MovieList title={'Movie'} hideSeeAll={true} data={personMovies} />
            </View>
                )
            }

          
        </ScrollView>
    )
}