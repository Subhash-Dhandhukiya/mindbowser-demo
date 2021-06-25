import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { color } from '../../Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DETAILS } from '../../Constant/Route';


const FavoriteScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  //Get Data from AsyncStorage
  const getData = async () => {
    const val = await AsyncStorage.getItem('storage');
    if (val) {
      setData(JSON.parse(val));
    } else {
      setData([])
    }
  };

  useEffect(() => {
    getData();
  }, [data]);


  //Navigate Data to Details Screen
  const Navigate_Data = (image, title, description, id) => {
    navigation.navigate(DETAILS, {
      img: image,
      title,
      description,
      id,
    });
  };


  //Render fetched data
  const renderItem = ({ item, index }) => {
    try {
      var discription = item.description;
    } catch (error) {
      discription = 'Description is not available';
    }

    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 100,
          flex: 1,
          margin: 1,
          width: '40%',
        }}
        onPress={() =>
          Navigate_Data(item.img, item.title, discription, item.id)
        }>
        <Image
          source={{ uri: item.img }}
          style={{ width: '100%', height: '100%' }}
        />
      </TouchableOpacity>
    );
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20 }}>Favorite</Text>
      </View>
      <View style={{ height: 0.5, backgroundColor: color.DARK_GRAY }} />

      {data.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => renderItem({ item })}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
          <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
              }}

              onPress={async () => {
                await AsyncStorage.removeItem('storage');
                await getData();
              }}

            >
              <Text
                style={{ color: 'white', fontWeight: 'bold' }}>
                Remove all fav
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:30,color:color.ICON}}>No Item </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
});
