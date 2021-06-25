import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { color } from '../../Constant';

export default class App extends Component {
  
  componentDidMount(){
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <LottieView
          ref={animation=>{
            this.animation=animation;
          }}

          style={{
            width:250,
            height:250,
          }}
          source={require('../../../assets/SplashAnimation/64936-smiley-face-cartoon.json')}
        />
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
      backgroundColor:color.WHITE,
      alignItems:'center',
      justifyContent:'center',
      flex:1
  }
})