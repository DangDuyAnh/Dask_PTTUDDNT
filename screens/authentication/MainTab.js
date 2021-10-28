import * as React from 'react';
import { Ionicons, MaterialCommunityIcons,  } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatTab from './ChatTab';
import DiaryTab from './DiaryTab';
import ProfileTab from './ProfileTab';
import * as Const from '../../config/Constants';

const Tab = createBottomTabNavigator();

export default function MainTab() {
    return (
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
              }
            },

            tabBarActiveTintColor: Const.COLOR_THEME,
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="ChatTab" component={ChatTab} />
          <Tab.Screen name="DiaryTab" component={DiaryTab} />
          <Tab.Screen name="ProfileTab" component={ProfileTab} />
        </Tab.Navigator>
    );
  }