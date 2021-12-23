import React, {useEffect, useState} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, Button } from 'react-native';
import {
  Entypo,
  FontAwesome,
  AntDesign
} from '@expo/vector-icons'
import VideoPlayer from 'react-native-video-controls';

import { PhotoList } from './Post';
import { GlobalContext } from '../../../utility/context';
import * as Const from '../../../config/Constants';
import {styles, FormatTime} from './DiaryTab';
import BottomPopupSelf from '../../../components/BottomPopupSelf';
import BottomPopupOther from '../../../components/BottomPopupOthers';

export default function SinglePost(props) {

    const { globalState } = React.useContext(GlobalContext);
    const [post, setPost] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    const [showPopupSelf, setShowPopupSelf] = useState(false);
    const [showPopupOther, setShowPopupOther] = useState(false);
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
            let postId = props.route.params;
            const response = await fetch(Const.API_URL+'/api/posts/show/' + postId, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${globalState.userToken}`,
                },
                });
            const json = await response.json();
            const newImages = [];
            json.data.images.forEach((value, i) => {
              newImages.push(Const.API_URL + value);
              });
  
            const newVideos = [];
            json.data.videos.forEach((value, i) => {
              newVideos.push(Const.API_URL + value);
              });
  
            setPost({...json.data, images: newImages, videos: newVideos, countLikes: json.data.like.length});
            // setPost(json.data);
            }   catch (error) {
                console.error(error);
            }
            setIsLoad(true);
        } 
        getData();
    }, []);

    const deletePost = (item) => {
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

    const heartPress = async(id) => {
        if (post.isLike) {
          setPost({...post, isLike: false, countLikes: post.countLikes - 1})
        } else {
          setPost({...post, isLike: true, countLikes: post.countLikes + 1})
        }
        const response = await fetch(Const.API_URL+'/api/postLike/action/' + id, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${globalState.userToken}`,
          },
      })
      }

    return(
        <ScrollView style={styles.container}>
        {(isLoad)&&<View style={styles.feedContainer}>

            <View style={styles.feedHeader}> 
              <View style = {styles.headerInner}>
                <Image source={{uri: Const.API_URL + post.author.avatar}} style = {styles.imageFeed} />
                <View style = {styles.headerText}>
                  <Text style={styles.feedAuthor}>{post.author.username}</Text>
                  <FormatTime data={post.createdAt}/>
                </View>
              </View>  
              <TouchableOpacity onPress={() => {
                setPostData(post);
                if (globalState.user._id === post.author._id)
                  setShowPopupSelf(true)
                else 
                  setShowPopupOther(true)
                }}>
                <Entypo name="dots-three-horizontal" size={20} color="black" />
              </TouchableOpacity>
            </View>

            {(post.described)&&<Text style={styles.feedDescribed}>{post.described}</Text>}

            {(post.images.length !== 0) && <PhotoList imageList={post.images}/> }
            {(post.videos.length !== 0) &&
              <View style={styles.imageContainer}>
                <VideoPlayer style = {{width: '100%', height: 400}} source = {{uri: post.videos[0]}} disableBack
                paused = {true}/>
              </View>}

            {(post.images.length === 0 && post.videos.length === 0) && <View style={styles.feedDivide} />}

            <View style={styles.twoIcons}>
              <View style={styles.oneIcon}>
                <TouchableOpacity onPress={() => heartPress(post._id)}>
                  <AntDesign name={post.isLike?"heart":"hearto"} size={24} color={post.isLike?"#f44336":'black'} />
                </TouchableOpacity>
                <Text style={styles.textIcon}>{post.countLikes}</Text>
              </View>
              <View style={styles.oneIcon}>
              <FontAwesome name="comment-o" size={24} color="black" />
                <Text style={styles.textIcon}>{post.countComments}</Text>
              </View>
            </View>

            
        </View>}
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

        </ScrollView>
    );
}