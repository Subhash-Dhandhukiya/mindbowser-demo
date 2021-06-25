import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { color } from '../../Constant'
import { BackIcon, EmptyHeartIcon, FillHeartIcon } from '../../Constant/Icon'
import {setAsyncStorage,key, removeItem,getAsyncStorage} from '../../AsyncStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DetailsScreen = ({ route, navigation }) => {

    const { params } = route;
    const { img, title, description ,id} = params;

    const [like, setLike] = useState(false);
    
    const handleFavorite=async()=>{
        const favotireItem={
            img:img,
            title:title,
            description:description,
            id:id,
            count:count
        }
        const val= await AsyncStorage.getItem("storage")
        let count=1;
        let oldFav =[...val]
        if(val?.length>0){
                

                oldFav.push(favotireItem)
                await AsyncStorage.setItem("storage",JSON.stringify(oldFav))


        }else{
            oldFav.push(favotireItem)
            await AsyncStorage.setItem("storage",JSON.stringify(oldFav))
        }



        
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', height: 55 }}>
                <TouchableOpacity
                    style={{ height: 55, width: 60, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => navigation.goBack()}
                >
                    <BackIcon
                        fill={color.BLACK}
                        height={21}
                        width={21}
                    />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', paddingLeft: 100 }}>
                    <Text style={{ color: color.width, fontSize: 20 }}>Details</Text>
                </View>
            </View>
            <View style={{height:0.5,backgroundColor:color.DARK_GRAY}}/>

            <ScrollView>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ paddingRight: 15 ,paddingTop:15}}  onPress={() => handleFavorite()}>
                        {like ? (<FillHeartIcon fill={color.RED} height={22} width={22} />) :
                            (<EmptyHeartIcon fill={color.BLACK} height={22} width={22} />)}
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,marginTop:10}}>
                    <Image source={{ uri: img }} style={{ height: 250, width: 250 }} />
                </View>

                <View style={{ marginTop: 30 }}>
                    <View style={{ height: 25, justifyContent: 'center', paddingLeft: 19 }}>
                        <Text style={{ fontSize: 18, color: color.BLACK }}>Title :</Text>
                    </View>
                    <View style={{  justifyContent: 'center', paddingLeft: 40 }}>
                        <Text style={{ fontSize: 14, color: color.DARK_GRAY }}>{title}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 15 }}>
                    <View style={{ justifyContent: 'center', paddingLeft: 19 }}>
                        <Text style={{ fontSize: 18, color: color.BLACK }}>Description :</Text>
                    </View>
                    <View style={{ paddingTop: 5, justifyContent: 'center', paddingLeft: 40 }}>
                        <Text style={{ fontSize: 14, color: color.DARK_GRAY }}>{description}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.WHITE,
    }
})


// const handleFavorite =async () => {
    //     setLike(!like);
        
    //     const obj={img,title,description,id};

    //     if(like==false){
    //        await setAsyncStorage(key.id,obj);
    //     }else{
    //        await removeItem(key.id)
    //     }
    // }