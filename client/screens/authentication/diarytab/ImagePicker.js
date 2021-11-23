import React, {useEffect, useState} from "react";
import {PermissionsAndroid, View, TouchableOpacity, Image, Text } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

import { GlobalContext } from '../../../utility/context';
import { hasAndroidPermission } from "../../../utility/PermissionsAndroid";

export default function ImagePicker(props){

    const { globalFunction } = React.useContext(GlobalContext);
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [selectedPhotos, setSelectedPhotos] = useState([])
    const [currentAlbum, setCurrentAlbum] = useState('All')

    // async function hasAndroidPermission() {
    //     const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      
    //     const hasPermission = await PermissionsAndroid.check(permission);
    //     if (hasPermission) {
    //       return true;
    //     }
      
    //     const status = await PermissionsAndroid.request(permission);
    //     console.log(status);
    //     return status === 'granted';
    //   };

    const getAlbums = () => {
        CameraRoll.getAlbums({assetType: 'Photos'})
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
          assetType: 'Photos',
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
        assetType: 'Photos',
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
      if (!(selectedPhotos.includes(item.node.image.uri))) {
        setSelectedPhotos([...selectedPhotos, item.node.image.uri]);
      } else {
        for (let i = 0; i < selectedPhotos.length; i++) {
          if (selectedPhotos[i] === item.node.image.uri) {
            let arr = selectedPhotos;
            arr.splice(i, 1);
            setSelectedPhotos([...arr]);
          }
        }
      }
    }

    const changeAlbum = (name) => {
      setCurrentAlbum(name);
      getPhotos(name);
    };

    const handleNext = () => {
      props.navigation.navigate('Post',{images: selectedPhotos});
      globalFunction.updatePostImages(selectedPhotos);
    }
      
    useEffect(() =>{
    if(hasAndroidPermission()){
        getAlbums();
      }
    }, []);

    // const renderPhotos = ({item, idx}) => (
    //     <TouchableOpacity key={idx} style={{width: '32%', height: 150, margin: 2, backgroundColor: 'white'}}
    //     onPress = {() => {tappedPhotos(item)}}>
    //       {selectedPhotos.includes(item.node.image.uri)&&
    //       <Text style={{padding: 5, height: 30, width: 30, borderRadius: 15, textAlign: 'center',
    //       position: 'absolute', top: 10, right: 10, elevation: 20, backgroundColor: '#1878f3', color: 'white'}}>
    //         {selectedPhotos.indexOf(item.node.image.uri) + 1}</Text>}
    //         <Image source = {{uri: item.node.image.uri}} 
    //         style={{flex: 1, borderWidth: selectedPhotos.includes(item.node.image.uri)?3:0,
    //                 borderColor: selectedPhotos.includes(item.node.image.uri)?'#1878f3':'transparent'}}
            
    //         />
    //     </TouchableOpacity>
    // );

      return(
        <View style = {{backgroundColor: 'white', flex: 1}}>
          <View style={{position: 'absolute', top: 0, width: '100%', height: 70,
            backgroundColor: 'white', left: 0, right: 0, elevation: 10, zIndex: 3, padding: 10,}}>
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
            {/* <View style={{alignContent: 'center', backgroundColor: 'white', alignItems: 'center', flex: 1, marginTop: 80}}>
                <FlatList 
                    data={photos}
                    renderItem={renderPhotos}
                    numColumns={3}
                />
            </View> */}
            <View style={{paddingLeft: 5, backgroundColor: 'white', flex: 1, paddingTop: 80, flexDirection: 'row', flexWrap: 'wrap'}}>

              <TouchableOpacity style={{backgroundColor: 'white', width: '32%', height: 150, margin: 2, justifyContent: 'center', alignItems: 'center',
              borderColor: 'black', borderRadius: 5, borderWidth: 1}}
              onPress = {() => {
                props.navigation.navigate('Camera');
              }}>
                <Ionicons name="camera-outline" size={40} color="black" />
                <Text style={{fontSize: 16, color: 'black'}}>Chụp ảnh</Text>
              </TouchableOpacity>

              {photos.map((item, idx) =>{
                return(
                  <TouchableOpacity key={idx} style={{width: '32%', height: 150, margin: 2}}
                  onPress = {() => {tappedPhotos(item)}}>
                    {selectedPhotos.includes(item.node.image.uri)&&
                    <Text style={{padding: 5, height: 30, width: 30, borderRadius: 15, textAlign: 'center',
                    position: 'absolute', top: 10, right: 10, elevation: 20, backgroundColor: '#1878f3', color: 'white'}}>
                      {selectedPhotos.indexOf(item.node.image.uri) + 1}</Text>}
                      <Image source = {{uri: item.node.image.uri}} 
                      style={{flex: 1, borderWidth: selectedPhotos.includes(item.node.image.uri)?3:0,
                              borderColor: selectedPhotos.includes(item.node.image.uri)?'#1878f3':'transparent'}}
                      
                      />
                  </TouchableOpacity>
                );
              })}
            </View>
        </View>
      );
}
