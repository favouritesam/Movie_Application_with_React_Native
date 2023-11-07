import { View, Text } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import { tailwind } from 'react-native-tailwindcss'
import * as Progress from 'react-native-progress';

const {width,height} = Dimensions.get('window')

export default function Loading() {
  return (
    <View style={[{ height, width }, tailwind.absolute,tailwind.flexRow,tailwind.justifyCenter ,tailwind.itemsCenter]}>
    <Progress.CircleSnail thickness={12} size={160} color='yellow'/>
  </View>
  
  )
}