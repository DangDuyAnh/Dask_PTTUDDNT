import React, {useEffect, useState} from "react";
import {PermissionsAndroid, Platform, View, TouchableOpacity, Image, FlatList, Text, Button, ScrollView, StyleSheet, ProgressViewIOSComponent } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import Video from 'react-native-video';
import { Feather } from '@expo/vector-icons';

import { GlobalContext } from '../../../utility/context';

export default function ImagePicker(props){

    const { globalFunction } = React.useContext(GlobalContext);
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [selectedPhotos, setSelectedPhotos] = useState(null);
    const [currentAlbum, setCurrentAlbum] = useState('All')

    async function hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
          return true;
        }
      
        const status = await PermissionsAndroid.request(permission);
        console.log(status);
        return status === 'granted';
      };

    const getAlbums = () => {
        CameraRoll.getAlbums({assetType: 'Videos'})
        .then(r => {
            setAlbums(r);
            getPhotos('All');
        })
        .catch(err => console.log(e));
    };

    const getPhotos = (album) => {
      if (album === 'All'){
        CameraRoll.getPhotos({
          first: 20,
          assetType: 'Videos',
        })
        .then(r => {
          setPhotos(r.edges);
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
      CameraRoll.getPhotos({
        first: 20,
        assetType: 'Videos',
        groupTypes: 'Album',
        groupName: album
      })
      .then(r => {
        setPhotos(r.edges);
      })
      .catch((err) => {
         console.log(err);
      });
      }
    }

    const tappedPhotos = (item) => {
      if (selectedPhotos === item.node.image.uri) {
        setSelectedPhotos(null);
      } else {
        setSelectedPhotos(item.node.image.uri)
      }
    }

    const changeAlbum = (name) => {
      setCurrentAlbum(name);
      getPhotos(name);
    };

    const handleNext = () => {
      props.navigation.navigate('Post', {video: selectedPhotos});
      globalFunction.updatePostVideo(selectedPhotos);
    }
      
    useEffect(() =>{
    if(hasAndroidPermission()){
        getAlbums();
      }
    }, []);

      return(
        <View style = {{backgroundColor: 'white', flex: 1}}>
          <View style={{position: 'absolute', top: 0, width: '100%', height: 70,
            backgroundColor: 'white', left: 0, right: 0, elevation: 50, zIndex: 3, padding: 10,}}>
            <Picker
              selectedValue={currentAlbum}
              style={{ height: 50, width: 150, fontSize: 20, color: 'black'}}
              onValueChange={(itemValue, idxValue) => changeAlbum(itemValue)}
              >
              <Picker.Item label = 'All' value = 'All'/>
              {albums.map((item, idx) => {
                return <Picker.Item key={idx} label = {item.title} value = {item.title} />
              })}
            </Picker>

            <TouchableOpacity style={{backgroundColor: "#1878f3", padding: 10, width: 80, right: 20, position: 'absolute',
            top: 15, borderRadius: 10, zIndex: 5}} onPress={handleNext}>
              <Text style={{color: 'white', textAlign: 'center'}}>Next</Text>
            </TouchableOpacity>

          </View>
          <View style={{paddingLeft: 5, backgroundColor: 'white', flex: 1, paddingTop: 80, flexDirection: 'row', flexWrap: 'wrap'}}>

            <TouchableOpacity style={{backgroundColor: 'white', width: '32%', height: 150, margin: 2, justifyContent: 'center', alignItems: 'center',
            borderColor: 'black', borderRadius: 5, borderWidth: 1}}
            onPress = {() => {props.navigation.navigate('VideoCamera')}}>
              <Ionicons name="videocam-outline" size={40} color="black" />
              <Text style={{fontSize: 16, color: 'black'}}>Quay video</Text>
            </TouchableOpacity>

            {photos.map((item, idx) =>{
              return(
                <TouchableOpacity key={idx} style={{width: '32%', height: 150, margin: 2}}
                onPress = {() => {tappedPhotos(item)}}>
                  {(selectedPhotos === item.node.image.uri)&&
                  <View style={{padding: 5, height: 30, width: 30, borderRadius: 15, textAlign: 'center',
                  position: 'absolute', top: 10, right: 10, elevation: 20, backgroundColor: 'white'}}>
                    <Feather name="check" size={20} color="#1878f3" />
                  </View>}
                    <Video source = {{uri: item.node.image.uri}} resizeMode={"cover"} muted={true} repeat={true} rate={1.0} ignoreSilentSwitch={"obey"}
                    style={{flex: 1, borderWidth: (selectedPhotos === item.node.image.uri)?3:0,
                            borderColor: (selectedPhotos === item.node.image.uri)?'#1878f3':'transparent'}}
                    
                    />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
}
