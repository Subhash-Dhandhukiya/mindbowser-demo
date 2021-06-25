import React, { useEffect, useState } from 'react'
import { View, Text,SafeAreaView,StyleSheet,TouchableOpacity,Image } from 'react-native'
import { clearAsyncStorage, getAsyncStorage, key } from '../../AsyncStorage';
import { color } from '../../Constant'
import AsyncStorage from '@react-native-async-storage/async-storage'
const FavoriteScreen = ({navigation}) => {

    const [data, setData] = useState([]);
    const getData=async()=>{
        const val= await AsyncStorage.getItem("storage")
        console.log(val)

    }

    useEffect(()=>{
        getData();
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{height:50,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:20}}>Favorite</Text>
            </View>
            <View style={{height:0.5,backgroundColor:color.DARK_GRAY}}/>
            
            {/* <View>{data.map(item=>console.log(item))}</View> */}
        </SafeAreaView>
    )
}

export default FavoriteScreen

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:color.WHITE
    }
})
