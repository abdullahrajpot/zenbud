import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

export default function Home(){
  
    return (
      <View style={styles.flexContainer}>
        <Text style={{fontSize:30}}>Name: Abdullah Tariq </Text>
        <Text style={{fontSize:30}}>RollNo: 182866 </Text>
    {/* <Image
    style={styles.image}
    source= {require("./src/assets/")}
    /> */}
      </View>
    )
  }



const styles = StyleSheet.create({
flexContainer:{
  flex:1,
  // backgroundColor:"gray",
  justifyContent:'center',
  alignItems:'center'
  
},
image:{
  width:"80%",
  height:"60%",

}



})