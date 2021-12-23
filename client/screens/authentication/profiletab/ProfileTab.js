import * as React from 'react';
import { Button, View } from 'react-native';

import{ GlobalContext } from '../../../utility/context';
import * as Const from '../../../config/Constants';
import socketIOClient from "socket.io-client";

export default function ChatTab() {
  const { globalFunction, globalState } = React.useContext(GlobalContext);

  React.useEffect(() => {
    console.log('do this')
    let io = socketIOClient(Const.API_URL);
    io.emit('notification', '12345');
    io.on("test", () => {
        console.log('done-done')
      });
  }, []);

  const test = async () => {
    console.log('hi')
    try {
      await fetch( Const.API_URL + '/api/notifications/test', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
      })
    } catch (e) {
      console.log(e.message)
    }
  }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="test" onPress={() => {test()}} />
        <Button title="Đăng xuất" onPress={globalFunction.signOut}/>
      </View>
    );
  }