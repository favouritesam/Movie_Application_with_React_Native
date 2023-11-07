import { View, Text, ScrollView, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { tailwind } from 'react-native-tailwindcss'
import { fallbackPersonImage, image185 } from '../../api/Moviedb';
// import { useNavigation } from '@react-navigation/native';

export default function Cast({cast, navigation}) {
    
  return (
    <View style={[tailwind.mY6]}>
      <Text style={[tailwind.textWhite,tailwind.textLg,tailwind.mX4,tailwind.mB5]}>Top Cast</Text>
       <ScrollView
       horizontal
       showsHorizontalScrollIndicator={false}
       contentContainerStyle={{paddingHorizontal:15}}
       >
        {
            cast && cast.map((person,index)=>{
                return(
                    <TouchableOpacity
                    key={index}
                    style={[tailwind.mR4,tailwind.itemsCenter]}
                    // onPress={() => navigation.navigate('Person',person)}
                    onPress={()=> navigation.navigate('Person', person)} 

                    > 
                    <View 
                    style={[tailwind.overflowHidden,tailwind.roundedFull,tailwind.h20,tailwind.w20,tailwind.itemsCenter,tailwind.border,tailwind.borderGray500]}
                    >
                        <Image style={[{ borderRadius: 16 }, tailwind.h24, tailwind.w20]} 
                        //  source={require('../../assets/images/johnwick.jpeg')}
                        source={{uri: image185(person?.profile_path) || fallbackPersonImage}} 


                         />
                         </View>
                        <Text style={[tailwind.textWhite,tailwind.textXl,tailwind.mT1]}>
                        {
                                    person?.character.length>10? person.character.slice(0,10)+'...' : person?.character
                                }
                        </Text>

                        <Text style={[tailwind.textGray600,tailwind.textXl,tailwind.mT1]}>
                        {
                                    person?.original_name.length>10? person.original_name.slice(0,10)+'...' : person?.original_name
                                }
                        </Text>
                    </TouchableOpacity>
                )
            })
        }
       </ScrollView>
    </View>
  )
}