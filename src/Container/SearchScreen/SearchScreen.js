import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity, Image, Keyboard ,ActivityIndicator} from 'react-native'
import { color } from '../../Constant'
import axios from 'axios'
import { APIKEY } from '../../Constant/API'
import { DETAILS } from '../../Constant/Route'

const numColumns = 2;
const SearchScreen = ({ navigation }) => {

    const [text, setText] = useState('')
    const [data, setData] = useState([]);
    const [loading,setLoading]=useState(false);

    //Fetch Data from API
    const resultData = async () => {
        setLoading(true);
        Keyboard.dismiss();
        try {
            const result = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${text}&api_key=${APIKEY}`)
            setData(result.data.data);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
        // setText('');
    }

    //HandleChange TextInput
    const handleChange = (inputText) => {
        setText(inputText);
    }


    //Navigation Data to Details Screen
    const Navigate_Data = (image, title, description, id) => {

        navigation.navigate(DETAILS, {
            img: image,
            title,
            description,
            id
        })
    }


    //Render Fetched Data
    const renderItem = ({ item }) => {

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

            <SafeAreaView >
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search here..."
                        onChangeText={handleChange}
                        defaultValue={text}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => resultData()}
                    >
                        <Text style={{ color: color.WHITE, fontSize: 18 }}>Go</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: color.DARK_GRAY, height: 0.5 }} />

               {data.length>0 ? (
                    <View>

                    <FlatList
                        data={data}
                        renderItem={({ item }) => renderItem({ item })}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={numColumns}
                    />

                    <View style={{ marginBottom:-100}} />
                </View>
               ) : (
                 (loading ? (
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large" color={color.FONT} />
                </View>
                 ) : (<Text></Text>))
               )}
            </SafeAreaView>
    );
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.WHITE,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: color.BLACK,
        borderRadius: 20,
        width: "70%"
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.BLUE,
        borderRadius: 40,
        height: 40,
        marginTop: 12

    }
})