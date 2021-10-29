import * as React from 'react';
import { View, Image } from 'react-native';
import logo from "../../config/logo.png";
import * as Const from '../../config/Constants';

export default function WaitScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Const.COLOR_THEME }}>
        <View>
          <Image style={{ width: 300, height: 200}} source={logo}></Image>
        </View>
      </View>
    );
  }