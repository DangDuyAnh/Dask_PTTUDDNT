import * as React from 'react';
import { Button, View } from 'react-native';

import{ GlobalContext } from '../../../utility/context';
import * as Const from '../../../config/Constants';
import socketIOClient from "socket.io-client";

export default function ChatTab() {
  const { globalFunction, globalState } = React.useContext(GlobalContext);

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Đăng xuất" onPress={globalFunction.signOut}/>
      </View>
    );
  }