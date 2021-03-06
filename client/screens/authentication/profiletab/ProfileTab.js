import React, {useEffect, useState} from 'react';
import { Button, View, StatusBar, StyleSheet, ImageBackground, Image, TouchableOpacity
, Text, ScrollView } from 'react-native';

import{ GlobalContext } from '../../../utility/context';
import {FormatTime} from '../diarytab/DiaryTab'
import * as Const from '../../../config/Constants';
import BottomPopupSelf from '../../../components/BottomPopupSelf';
import BottomPopupOther from '../../../components/BottomPopupOthers';
import CommentPopup from '../../../components/CommentPopup';
import { PhotoList } from '../diarytab/Post';
import {
	Ionicons,
	MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  AntDesign
} from '@expo/vector-icons'
import VideoPlayer from 'react-native-video-controls';

export default function ProfileTab(props) {
  const { globalFunction, globalState } = React.useContext(GlobalContext);
  const [postList, setPostList] = useState([]);
  const [showPopupSelf, setShowPopupSelf] = useState(false);
  const [showPopupOther, setShowPopupOther] = useState(false);
  const [showPopupComment, setShowPopupComment] = useState(false);
  const [postData, setPostData] = useState(null);
  const [postForComment, setPostForComment] = useState(null);

  const deletePost = (item) => {
    setShowPopupSelf(false);
    let filterArr = postList.filter(value => value !== item);
    setPostList([...filterArr]);
  }

  const editPost = () => {
    setShowPopupSelf(false);
  }

  const closePopupSelf = () => {
    setShowPopupSelf(false);
  }

  const closePopupOther = () => {
    setShowPopupOther(false);
  }

  const closePopupComment = () => {
    setShowPopupComment(false);
  }
  const heartPress = async(id, idx) => {
    let posts = [...postList];
    if (posts[idx].isLike) {
      posts[idx].isLike = false;
      posts[idx].countLikes -= 1;
    } else {
      posts[idx].isLike = true;
      posts[idx].countLikes += 1;
    }
    setPostList(posts);
    const response = await fetch(Const.API_URL+'/api/postLike/action/' + id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${globalState.userToken}`,
      },
  })
  }

  useEffect(() => {
    try {
      const getData = async () => {
      const response = await fetch(Const.API_URL+'/api/posts/list?userId='+globalState.user._id, {
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

        newPostList.push({...item, images: newImages, videos: newVideos, countLikes: item.like.length});
      });
      setPostList(newPostList);
      };
      getData();
      const unsubscribe = props.navigation.addListener('focus', getData);
      return unsubscribe;
    } catch (error) {
      console.error(error);
    }
  }, [showPopupComment]);

  return (
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //   <Button title="????ng xu???t" onPress={globalFunction.signOut}/>
      // </View>
      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        <View style={{width: '100%', position: 'relative',  alignItems: 'center', paddingBottom: 50}}>
          <ImageBackground source={{uri: Const.API_URL+ globalState.user.cover_image}} style={styles.imageCover} resizeMode="cover">
              <View style={styles.innerDarker} />
          </ImageBackground>
          <Image source={{uri: Const.API_URL+ globalState.user.avatar}} style={styles.image} resizeMode="cover"/>
        </View>
        <Text style={{fontWeight: '500', color: 'black', fontSize: 22, marginBottom: 20}}>{globalState.user.username}</Text>
        <View style={styles.bottomDivider} />

        <ScrollView style={styles.container}>
        <View style={styles.toolBar}>
          <TouchableOpacity activeOpacity={1} onPress={() => {
            props.navigation.navigate('Post');
          }}>
            <View style={styles.row}> 
              <Image source={{uri: Const.API_URL + globalState.user.avatar}} style = {styles.image2} />
              <Text style={styles.input}> H??m nay b???n th??? n??o?</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <View style={{...styles.row, padding: 0}}>

            <TouchableOpacity style={styles.menu} activeOpacity={1} 
            onPress={() => props.navigation.navigate('Ch???n ???nh')}>
              <Ionicons name='ios-videocam' size={22} color='#F44337' />
              <Text style={styles.menuText}>????ng ???nh</Text>
            </TouchableOpacity>
            <View style={styles.separator}/>

            <TouchableOpacity style={styles.menu} activeOpacity={1}
             onPress={() => props.navigation.navigate('Ch???n video')}>
            <MaterialIcons name='photo-size-select-actual' size={22} color='#4CAF50' />
              <Text style={styles.menuText}>????ng video</Text>
            </TouchableOpacity>
            <View style={styles.separator}/>

            <TouchableOpacity style={styles.menu} activeOpacity={1}
             onPress={() => props.navigation.navigate('Post')}>
            <MaterialCommunityIcons name="pen" size={22} color='#E141FC' />
              <Text style={styles.menuText}>????ng b??i</Text>
            </TouchableOpacity>
    
          </View>
        </View>

        <View style={styles.bottomDivider} />

        {postList.map((item, idx) => {
          
          return(
          <View key={idx} style={styles.feedContainer}>

            <View style={styles.feedHeader}>
              <View style = {styles.headerInner}>
                <Image source={{uri: Const.API_URL + item.author.avatar}} style = {styles.imageFeed} />
                <View style = {styles.headerText}>
                  <Text style={styles.feedAuthor}>{item.author.username}</Text>
                  <FormatTime data={item.createdAt}/>
                </View>
              </View>  
              <TouchableOpacity onPress={() => {
                setPostData(item);
                if (globalState.user._id === item.author._id)
                  setShowPopupSelf(true)
                else 
                  setShowPopupOther(true)
                }}>
                <Entypo name="dots-three-horizontal" size={20} color="black" />
              </TouchableOpacity>
            </View>

            {(item.described)&&<Text style={styles.feedDescribed}>{item.described}</Text>}

            {(item.images.length !== 0) && <PhotoList imageList={item.images}/> }
            {(item.videos.length !== 0) &&
              <View style={styles.imageContainer}>
                <VideoPlayer style = {{width: '100%', height: 400}} source = {{uri: item.videos[0]}} disableBack
                paused = {true}/>
              </View>}

            {(item.images.length === 0 && item.videos.length === 0) && <View style={styles.feedDivide} />}

            <View style={styles.twoIcons}>
              <View style={styles.oneIcon}>
                <TouchableOpacity onPress={() => heartPress(item._id, idx)}>
                  <AntDesign name={item.isLike?"heart":"hearto"} size={24} color={item.isLike?"#f44336":'black'} />
                </TouchableOpacity>
                <Text style={styles.textIcon}>{item.countLikes}</Text>
              </View>
              <View style={styles.oneIcon}>
              <TouchableOpacity onPress={() => {
                setPostForComment(item);
                setShowPopupComment(true)
                }}>
                <FontAwesome name="comment-o" size={24} color="black" />
              </TouchableOpacity>
                <Text style={styles.textIcon}>{item.countComments}</Text>
              </View>
            </View>

            <View style={styles.bottomDivider} />
          </View>
        );})}

        <BottomPopupSelf
          show={showPopupSelf}
          closePopup={closePopupSelf}
          data = {postData}
          deletePost = {deletePost}
          editPost = {editPost}
        />

        {postData&&<BottomPopupOther
          show={showPopupOther}
          closePopup={closePopupOther}
          data = {postData}
        />}

        {postForComment&&<CommentPopup 
          show = {showPopupComment}
          closePopup={closePopupComment}
          animationType='slide'
          data = {postForComment}
        />}
      </ScrollView>
      </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    imageCover: {
        height: 150,
        width: '100%',
    },
    innerDarker: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.1)'
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45,
        position: 'absolute',
        top: 100,
        borderWidth: 3,
        borderColor: 'white'
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: 'black',
        paddingTop: 10,
        paddingBottom: 10
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#bdbdbd',
        marginBottom: 1
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
      width: '100%'
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
    image2: {
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