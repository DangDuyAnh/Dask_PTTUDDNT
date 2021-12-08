import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, ScrollView, Text, Button, Clipboard, StyleSheet, Alert } from 'react-native';

import io from 'socket.io-client'

import * as Const from '../../../config/Constants';
import { GlobalContext } from '../../../utility/context';

import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Conversation(props) {
  const chatId = props.route.params.chatId;
  const userId = props.route.params.userId;
  const [messages, setMessages] = useState([]);
  const { globalState } = React.useContext(GlobalContext);

  console.log(chatId)

  const socketRef = useRef()
  socketRef.current = io(Const.API_URL)

  useEffect(() => {
    
    try {
      const getMessages = async () => {
        const response = await fetch(Const.API_URL+'/api/chats/getMessages/'+chatId, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${globalState.userToken}`,
          },
        });
        const json = await response.json();
        let newMessagesList = [];
        (json.data).forEach((item, idx) => {
          newMessagesList.push({
            _id: item._id, 
            text: item.content, 
            createdAt: item.createdAt,
            user: {
              _id: item.user._id,
              name: item.user.username,
              avatar: Const.API_URL + item.user.avatar
            }
          });
        });
        setMessages(newMessagesList);
      };
      const unsubscribe = props.navigation.addListener('focus', getMessages);
      return unsubscribe;
    } catch (error) {
      console.error(error);
    }
    const socket = io(Const.API_URL)
    socket.on('id', id => {
      console.log(id)
    })
  }, [])

  // useEffect(() => {
  //   try {
  //     const getMessages = async () => {
  //       const response = await fetch(Const.API_URL+'/api/chats/getMessages/'+chatId, {
  //         method: 'GET',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${globalState.userToken}`,
  //         },
  //       });
  //       const json = await response.json();
  //       let newMessagesList = [];
  //       (json.data).forEach((item, idx) => {
  //         newMessagesList.push({
  //           _id: item._id, 
  //           text: item.content, 
  //           createdAt: item.createdAt,
  //           user: {
  //             _id: item.user._id,
  //             name: item.user.username,
  //             avatar: Const.API_URL + item.user.avatar
  //           }
  //         });
  //       });
  //       setMessages(newMessagesList);
  //     };
  //     const unsubscribe = props.navigation.addListener('focus', getMessages);
  //     return unsubscribe;
  //   } catch (error) {
  //     console.error(error);
  //   }

    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    //   {
    //     _id: 2,
    //     text: 'Hello world',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 1,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);
  // }, []);

  // const onSend = async ((messages = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // }, []);

  const onSend = (message) => {
    let userObject = message[0].user
    let txt = message[0].text
    console.log(message)
    setMessages(previousMessages => GiftedChat.append(previousMessages, message))
    const messageObject = {
      chatId: chatId,
      type: 'PRIVATE_CHAT',
      content: txt,
    }
    socketRef.current.emit('chat message', messageObject)
    fetch(Const.API_URL + '/api/chats/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${globalState.userToken}`
      },
      body: JSON.stringify(messageObject)
      }).then((res) => {
        return res.json();
      }).catch((err) => {
        console.log(err);
      });
  }

  const onDelete = (messageIdToDelete) => {
    setMessages(messages.filter(message => message._id !== messageIdToDelete))
    fetch(Const.API_URL + '/api/chats/deleteMessage/' + messageIdToDelete, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${globalState.userToken}`
      },
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }

  const onLongPress = (context, message) => {
    console.log(context, message);
    const options = ['Copy', 'Delete', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex
    }, (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          Clipboard.setString(message.text)
          break;
        case 1:
          Alert.alert(
          "Are your sure?",
          "Are you sure you want to remove this message?",
          [
            {
              text: "Yes",
              onPress: () => {
                onDelete(message._id)
              },
            },
            {
              text: "No",
            },
          ]
        );
          break;
        default:
          break;
      }
    })
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2E64E5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#2E64E5"
        }
      }}
      textStyle={{
        right: {
          color: "#FFF"
        }
      }}
    />
    );
  }

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: userId,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      infiniteScroll
      onLongPress={onLongPress}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
