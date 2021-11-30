import React from 'react';

import { Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

import { StyleSheet, View, Text, StatusBar, Touchable, TouchableOpacity, TextInput } from 'react-native';

import { authPost } from '../../../api/api'

import { LogBox } from 'react-native';

//LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

//console.warn = () => {};

function Contact(props) {

  const searchText = props.input;

  const [text, onChangeText] = React.useState("");

  let body = {
    keyword : '0986609276'
  }
  let res = authPost('/users/search', body);
  res.then((data)=>{
    onChangeText(JSON.stringify(data));
  })

  //https_url/search
  return(
    <Text> {text} </Text>
  )
}

export { Contact };