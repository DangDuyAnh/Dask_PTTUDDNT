import * as React from 'react';
import { Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text, StatusBar, Touchable, TouchableOpacity, TextInput } from 'react-native';

import ChatTab from './chattab/ChatTab';
import DiaryTab from './diarytab/DiaryTab';
import ProfileTab from './profiletab/ProfileTab';
import { Contact } from './contacttab/Contact';
import * as Const from '../../config/Constants';
import * as RootNavigation from '../../RootNavigation';

const Tab = createBottomTabNavigator();

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
  },
  input: {
    height: 100,
    width: '75%',
    fontSize: 20,
    color: 'white'

  }
});

function Header(props) {
  const change = props.onChangeText;
  const [text, onChangeText] = React.useState(props.searchText);
  return(
    <View style={styles.headerContainer}>
      <View style={styles.headerWrapper}>
        <Ionicons style={{...styles.headerChild, paddingRight: 10}} name="search-outline" size={26} color="white" />
        <TextInput
          style={styles.input}
          onChangeText={(e)=>{onChangeText(e); }}
          value={text}
          placeholder="Tìm bạn bè, ..."
          placeholderTextColor='white'
          clearTextOnFocus='true'
          selectionColor={'white'}
          underlineColorAndroid={'transparent'}
          onEndEditing={(e)=>{change(text);}}
        />
      </View>
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={{paddingRight: 10}} onPress = {() => {
          console.log('Hi');
          RootNavigation.navigate('Post')}}>
          <MaterialIcons name="post-add" size={26} color="white"  />
        </TouchableOpacity>
        <Ionicons name="ios-notifications-outline" size={26} color="white"  />
      </View>
    </View>
  )
}

export default function MainTab() {

  const [searchText, setChangeSearchText] = React.useState("");


  const header = <Header onChangeText={setChangeSearchText} searchText={searchText}/>;

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
        <Tab.Screen name="ChatTab" component={ChatTab} 
          options={{ 
            headerTitle: ()=>{return (header)}, 
            headerStyle: {
              backgroundColor: Const.COLOR_THEME,
            }
          }}
        />
        <Tab.Screen name="Contact" children={ ()=>{return(<Contact input={searchText}/>)}} 
          options={{ 
            headerTitle: ()=>{return (header)}, 
            headerStyle: {
              backgroundColor: Const.COLOR_THEME,
            }
          }}
        />
        <Tab.Screen name="DiaryTab" component={DiaryTab} 
          options={{ 
            headerTitle: ()=>{return (header)}, 
            headerStyle: {
              backgroundColor: Const.COLOR_THEME,
            }
          }}
          />
        <Tab.Screen name="ProfileTab" component={ProfileTab}
          options={{ 
            headerTitle: ()=>{return (header)}, 
            headerStyle: {
              backgroundColor: Const.COLOR_THEME,
            }
          }}
        />
      </Tab.Navigator>
    </>
  );
}
