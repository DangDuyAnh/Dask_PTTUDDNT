import * as React from 'react';
import { Text, View, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const Messages = [
  {
    id: '1',
    userName: 'Duy Anh',
    userImg: require('../../assets/users/user-1.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'Huu Kiet',
    userImg: require('../../assets/users/user-2.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Thai Son',
    userImg: require('../../assets/users/user-3.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Giang Tu',
    userImg: require('../../assets/users/user-4.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Anh Pham',
    userImg: require('../../assets/users/user-5.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
    {
    id: '6',
    userName: 'Anh Dang',
    userImg: require('../../assets/users/user-6.jpg'),
    messageTime: '3 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
    {
    id: '7',
    userName: 'Son Dang',
    userImg: require('../../assets/users/user-7.jpg'),
    messageTime: '4 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
    {
    id: '8',
    userName: 'Kiet Nguyen',
    userImg: require('../../assets/users/user-8.jpg'),
    messageTime: '7 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

export default function ChatTab({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={Messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Chat', {userName: item.userName})}
          >
            <View style={styles.userInfo}>
              <View style={styles.userImgWrapper}>
                <Image 
                  source={item.userImg}
                  style={styles.userImg}
                />
              </View>
              <View style={styles.textSection}> 
                <View style={styles.userInfoText}>
                  <Text style={styles.userName}>{item.userName}</Text>
                  <Text style={styles.postTime}>{item.messageTime}</Text>
                </View>
                <Text style={styles.messageText}>{item.messageText}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF50"
  },
  card: {
    width: "100%"
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  userImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC"
  },
  userInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Lato-Regular"
  },
  postTime: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Lato-Regular"
  },
  messageText: {
    fontSize: 14,
    color: "#333333"
  }
});

