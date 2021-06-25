import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import NavContainer from './src/Navigation'
import { SplashScreen } from './src/Container'

const App = () => {

  const [loading , setLoading]=useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    },3000)
  },[])

  return(
    <View style={{flex:1}}>
      {loading ? (<SplashScreen/>) : (<NavContainer/>)} 
    </View>
  )
}

export default App
