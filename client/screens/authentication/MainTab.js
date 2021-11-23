import * as React from 'react';
import { Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

import ChatTab from './chattab/ChatTab';
import DiaryTab from './diarytab/DiaryTab';
import ProfileTab from './profiletab/ProfileTab';
import Contact from './contacttab/Contact';
import * as Const from '../../config/Constants';

const Tab = createBottomTabNavigator();

export default function MainTab() {
    return (
      <>
        <StatusBar backgroundColor={Const.COLOR_THEME} />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'ChatTab') {
                iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              } else if (route.name === 'DiaryTab') {              
                iconName = focused ? 'clock-time-eight' : 'clock-time-eight-outline';
                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
              } else if (route.name === 'ProfileTab') {
                iconName = focused ? 'person' : 'person-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              } else if (route.name === 'Contact') {
                iconName = focused ? 'contacts' : 'contacts-outline';
                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
              }
            },

            tabBarActiveTintColor: Const.COLOR_THEME,
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="ChatTab" component={ChatTab} />
          <Tab.Screen name="Contact" component={Contact} />
          <Tab.Screen name="DiaryTab" component={DiaryTab} 
          options={{ 
            headerTitle: header, 
            headerStyle: {
            backgroundColor: Const.COLOR_THEME,
            },  
            }}/>
          <Tab.Screen name="ProfileTab" component={ProfileTab}/>
        </Tab.Navigator>
      </>
    );
  }

  const header = () => {
    return(
      <View style={styles.headerContainer}>
        <View style={styles.headerWrapper}>
          <Ionicons style={{...styles.headerChild, paddingRight: 10}} name="search-outline" size={26} color="white" />
          <Text style = {styles.headerText}>Tìm bạn bè, tin nhắn ...</Text>
        </View>
        <View style={styles.headerWrapper}>
          <MaterialIcons style={{paddingRight: 10}} name="post-add" size={26} color="white"  />
          <Ionicons name="ios-notifications-outline" size={26} color="white"  />
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "space-between",
      width: '100%',
    },
    headerWrapper: {
      flexDirection: 'row', 
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 10,
    },
    headerText: {
      fontSize: 18,
      color: 'white'
    }
  });
