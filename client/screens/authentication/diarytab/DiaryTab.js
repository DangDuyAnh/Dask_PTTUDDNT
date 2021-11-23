import React, {useEffect, useState} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, Button } from 'react-native';
import {
	Ionicons,
	MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  AntDesign
} from '@expo/vector-icons'
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

import * as Const from '../../../config/Constants';
import { GlobalContext } from '../../../utility/context';
import { PhotoList } from './Post';
import BottomPopupSelf from '../../../components/BottomPopupSelf';

export default function DiaryTab(props) {

  const [postList, setPostList] = useState([]);
  const { globalState } = React.useContext(GlobalContext);
  const [showPopupSelf, setShowPopupSelf] = useState(false);

  const closePopupSelf = () => {
      setShowPopupSelf(false);
  }

  useEffect(() => {
    try {
      const getData = async () => {
      const response = await fetch(Const.API_URL+'/api/posts/testListPost', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${globalState.userToken}`,
        },
      });
      const json = await response.json();
      let newPostList = [];
      (json.data).forEach((item, idx) => {
        const newImages = [];
          item.images.forEach((value, i) => {
            newImages.push(Const.API_URL + value);
            });

          const newVideos = [];
          item.videos.forEach((value, i) => {
            newVideos.push(Const.API_URL + value);
            });

        newPostList.push({...item, images: newImages, videos: newVideos});
      });
      setPostList(newPostList);
      };
      getData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const FormatTime = ({data}) => {
    let currentYear = new Date().getFullYear();
    let time = new Date(data);
    let showTime;
    let singleMinutes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let minute = time.getMinutes().toString();
    if (singleMinutes.includes(minute)) minute = '0' + minute;
    if (currentYear === time.getFullYear()) {
      showTime = `${time.getDate()}/${time.getMonth()+1} lúc ${time.getHours()}:${minute}`
    } else {
      showTime = `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()} lúc ${time.getHours()}:${minute}`
    }

    return (
      <Text>{showTime}</Text>
    );
  }

    return (
      <ScrollView style={styles.container}>

        <View style={styles.toolBar}>
          <TouchableOpacity activeOpacity={1} onPress={() => {
            props.navigation.navigate('Post');
          }}>
            <View style={styles.row}> 
              <Image source={{uri: Const.API_URL+'/uploads/DefaultMale.jpg'}} style = {styles.image} />
              <Text style={styles.input}> Hôm nay bạn thế nào?</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <View style={{...styles.row, padding: 0}}>

            <TouchableOpacity style={styles.menu} activeOpacity={1} 
            onPress={() => props.navigation.navigate('Chọn ảnh')}>
              <Ionicons name='ios-videocam' size={22} color='#F44337' />
              <Text style={styles.menuText}>Đăng ảnh</Text>
            </TouchableOpacity>
            <View style={styles.separator}/>

            <TouchableOpacity style={styles.menu} activeOpacity={1}
             onPress={() => props.navigation.navigate('Chọn video')}>
            <MaterialIcons name='photo-size-select-actual' size={22} color='#4CAF50' />
              <Text style={styles.menuText}>Đăng video</Text>
            </TouchableOpacity>
            <View style={styles.separator}/>

            <TouchableOpacity style={styles.menu} activeOpacity={1}
             onPress={() => props.navigation.navigate('Post')}>
            <MaterialCommunityIcons name="pen" size={22} color='#E141FC' />
              <Text style={styles.menuText}>Đăng bài</Text>
            </TouchableOpacity>
    
          </View>
        </View>

        <View style={styles.bottomDivider} />

        {postList.map((item, idx) => {
          
          return(
          <View key={idx} style={styles.feedContainer}>

            <View style={styles.feedHeader}>
              <View style = {styles.headerInner}>
                <Image source={{uri: Const.API_URL+'/uploads/DefaultMale.jpg'}} style = {styles.imageFeed} />
                <View style = {styles.headerText}>
                  <Text style={styles.feedAuthor}>{item.author}</Text>
                  <FormatTime data={item.createdAt}/>
                </View>
              </View>  
              <TouchableOpacity onPress={() => setShowPopupSelf(true)}>
                <Entypo name="dots-three-horizontal" size={20} color="black" />
              </TouchableOpacity>
            </View>

            {(item.described)&&<Text style={styles.feedDescribed}>{item.described}</Text>}

            {(item.images.length !== 0) && <PhotoList imageList={item.images}/> }
            {(item.videos.length !== 0) &&
              <View style={styles.imageContainer}>
                {/* <Video style = {{width: '100%', height: 400}} source = {{uri: item.videos[0]}}
                      resizeMode={"cover"} muted={true} repeat={true} rate={1.0} /> */}
                <VideoPlayer style = {{width: '100%', height: 400}} source = {{uri: item.videos[0]}} disableBack
                paused = {true}/>
              </View>}

            {(item.images.length === 0 && item.videos.length === 0) && <View style={styles.feedDivide} />}

            <View style={styles.twoIcons}>
              <View style={styles.oneIcon}>
                <AntDesign name="heart" size={24} color="#f44336" />
                <Text style={styles.textIcon}>{item.like.length}</Text>
              </View>
              <View style={styles.oneIcon}>
              <FontAwesome name="comment-o" size={24} color="black" />
                <Text style={styles.textIcon}>{item.like.length}</Text>
              </View>
            </View>

            <View style={styles.bottomDivider} />
          </View>
        );})}

        <BottomPopupSelf
          show={showPopupSelf}
          closePopup={closePopupSelf}
        />
      </ScrollView>
    );
  }

  const styles=StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    toolBar: {
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      backgroundColor: 'white',
      width: '100%',
      padding: 12,
      alignItems: 'center'
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25
    },
    input: {
      paddingLeft: 10,
      padding:0,
      margin: 0,
      fontSize: 18,
      color: '#9e9e9e',
      fontWeight: '500',
    },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: '#e0e0e0'
    },
    menu: {
      flex: 1,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', 
    },
    menuText: {
      paddingLeft: 10,
      fontWeight: '500',
      fontSize: 15,
    },
    separator: {
      width: 1,
      height: '100%',
      backgroundColor: '#e0e0e0'
    },
    bottomDivider: {
      width: '100%',
      height: 10,
      backgroundColor: '#e0e0e0'
    },
    feedContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    feedHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 12,
    },  
    imageFeed: {
      width: 40,
      height: 40,
      borderRadius: 25
    },
    headerInner: {
      padding: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      marginLeft: 15,
    },
    feedAuthor: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
      color: 'black',
    },
    feedDescribed: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 5,
      paddingBottom: 16,
      fontSize: 16,
      color: 'black'
    },
    feedDivide: {flex: 1, backgroundColor: '#e0e0e0', height: 1, marginLeft: 16, marginRight: 16},
    twoIcons: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center'
    },
    oneIcon: {
      flexDirection: 'row',
      paddingRight: 30,
      alignItems: 'center',
    },
    textIcon: {
      fontSize: 18,
      color: 'black',
      paddingLeft: 10,
    },
    imageContainer: {
      padding: 5,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    }
  })