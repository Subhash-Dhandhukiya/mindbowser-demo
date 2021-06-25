import React, { useState, useEffect, isValidElement } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import axios from 'axios'
import { DETAILS } from '../../Constant/Route';
import { APIKEY } from '../../Constant/API';
import { color } from '../../Constant';


const numColumns = 2;
const HomeScreen = ({ navigation }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}`)
                setData(result.data.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])

    // Navigate to Details 
    const Navigate_Data = (image, title, description, id) => {

        navigation.navigate(DETAILS, {
            img: image,
            title,
            description,
            id
        })
    }


    const renderItem = ({ item, index }) => {

        try {
            var discription = item.user.description;
        } catch (error) {
            discription = "Description is not available"
        }

        return (
            <TouchableOpacity
                style={{ alignItems: 'center', justifyContent: 'center', height: 100, flex: 1, margin: 1, width: "40%" }}
                onPress={() => Navigate_Data(item.images.fixed_height.url, item.title, discription, item.id)}
            >
                <Image
                    source={{ uri: item.images.fixed_height.url }}
                    style={{ width: "100%", height: "100%" }}
                />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <View style={styles.display}>
                <Text style={{ fontSize: 20, color: color.BLUE }}>Gifs</Text>
            </View>
            <View style={{ backgroundColor: color.BLACK, height: 0.5 }} />
            <View>

                <FlatList
                    data={data}
                    renderItem={({ item }) => renderItem({ item })}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={numColumns}
                />

                <View style={{ marginBottom: -100 }} />
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    main: {
        display: 'flex',
        width: '80%',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    display: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {}
})