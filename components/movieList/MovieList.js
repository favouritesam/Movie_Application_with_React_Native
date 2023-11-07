import React from 'react';
import { ScrollView, Text, View, Image, Dimensions } from 'react-native';
import { t, tailwind } from 'react-native-tailwindcss';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native'
import { fallbackMoviePoster, image185 } from '../../api/Moviedb';


var {width,height} = Dimensions.get('window');

export default function MovieList({ title, data, hideSeeAll }) {
  let movieName = 'Ant-Man and the Wasp: Quantumania';
  const navigation = useNavigation();

  // const imageSize = '90%'; 

  return (
    <View style={[tailwind.mB10, { gap: 4 },tailwind.mT10]}>
      <View style={[tailwind.mB8, tailwind.flexRow, tailwind.justifyBetween,{marginLeft:20}]}>
        {/* <View style={[tailwind.justifyBetween]}></View> */}
        <Text style={[tailwind.textWhite, tailwind.textXl, { marginRight: 200 }]}>{title}</Text>

        {
              !hideSeeAll && (
        <TouchableOpacity>
             <Text style={[tailwind.textYellow900, tailwind.textLg, { marginRight: 20 }]}>See All</Text>
        </TouchableOpacity>
              )
        }

      </View>
      <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
          data.map((item, index) => {
            return(
    <TouchableWithoutFeedback
     key={index} 
   onPress={() => navigation.push('Movie',item)}

    >
   <View style={[{ borderRadius: 16 }]}>
  <Image
  source={{uri: image185(item.poster_path) || fallbackMoviePoster}}
    // source={require('../../assets/images/antman.jpg')}
    style={{
      width: width*0.33,
      height: height*0.22,
      // aspectRatio: 1,
      borderRadius: 16,
      margin: 20, 
    }}
  />
   <Text style={[tailwind.textWhite, tailwind.textSm, tailwind.mT0, { margin: 22 }]}>
   {
  item.title && item.title.length > 147 ? `${item.title.slice(0, 14)}...` : item.title
}

  </Text>
  </View>
          </TouchableWithoutFeedback>
          )
        })
          }
      </ScrollView>
    </View>
  );
}






















// import React from 'react'
// import { ScrollView,Text, View ,Image} from 'react-native'
// import { tailwind } from 'react-native-tailwindcss'
// import { TouchableOpacity } from 'react-native'
// import { styles } from '../../theme/Index'
// import { TouchableWithoutFeedback } from 'react-native'
// import { useNavigation } from '@react-navigation/native'

// export default function MovieList ({title,data}){
//     let movieName = 'Ant-Man and  the Wasp: Quantumania';
//     const navigation = useNavigation ();
//     const imageSize = '60%';
//   return (
//     <View style={[tailwind.mB10,{gap: 4}]}>
//     <View style={[tailwind.mB8,tailwind.flexRow,tailwind.justifyBetween,tailwind.mR100]}>
//     <View style={[tailwind.justifyBetween]}></View>
//     <Text style={[tailwind.textWhite,tailwind.textXl, {marginRight:200}]}>{title}</Text>
//     <TouchableOpacity>
//         <Text style={[tailwind.textYellow900,tailwind.textLg, {marginRight:20}]}>See All</Text>
//     </TouchableOpacity>
//     </View>
//     <ScrollView
//     horizontal
//     showsHorizontalScrollIndicator={false}
//     contentContainerStyle={{paddingHorizontal: 15}}
//     >
//         {
//            data.map((item,index)=>{
//             return(
//                <TouchableWithoutFeedback
//                key={index}
//                onPress={()=> navigation.navigate('Movies',item)}
//                >
//                <View style={[tailwind.gap, { borderRadius: 16 } ,tailwind.spaceX2]}>
//                <Image 
//                source={require('../../assets/images/antman.jpg')}
//                style={{
//                 width: imageSize,
//                height: imageSize, // Same as width to maintain a square aspect ratio
//                borderRadius: 16, // Rounded corners (adjust the value for your desired level of rounding)
//         }}
//                />
//                <Text style={[tailwind.textWhite, tailwind.mL1]}>
//                {
//                 movieName.length>147 movieName.slice{0,14}+'...':movieName
//                }
              
//                </Text>
//                </View>
//                </TouchableWithoutFeedback>
//             )
//            })
//         }
//     </ScrollView>
//   </View>

//   )
// }









// import React from 'react';
// import { ScrollView, Text, View, Image } from 'react-native';
// import { tailwind } from 'react-native-tailwindcss';
// import { TouchableOpacity } from 'react-native';
// import { TouchableWithoutFeedback } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// export default function MovieList({ title, data }) {
//   const movieName = 'Ant-Man and the Wasp: Quantumania';
//   const navigation = useNavigation();

//   return (
//     <View style={[tailwind.mB10, { gap: 4 }]}>
//       <View style={[tailwind.mB8, tailwind.flexRow, tailwind.justifyBetween, tailwind.mR100]}>
//         <View style={[tailwind.justifyBetween]}></View>
//         <Text style={[tailwind.textWhite, tailwind.textXl, { marginRight: 200 }]}>{title}</Text>
//         <TouchableOpacity>
//           <Text style={[tailwind.textYellow900, tailwind.textLg, { marginRight: 20 }]}>See All</Text>
//         </TouchableOpacity>
//       </View>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
//         {data.map((item, index) => (
//           <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Movies', item)}>
//             <View style={[tailwind.gap, { borderRadius: 16 }, tailwind.spaceX2]}>
//               <Image
//                 source={require('../../assets/images/antman.jpg')}
//                 style={{
//                   width: '20%',
//                   aspectRatio: 1,
//                   borderRadius: 16,
//                 }}
//               />
//               <Text style={[tailwind.textWhite, tailwind.mL1]}>
//                 {movieName.length > 147 ? `${movieName.slice(0, 14)}...` : movieName}
//               </Text>
//             </View>
//           </TouchableWithoutFeedback>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }


