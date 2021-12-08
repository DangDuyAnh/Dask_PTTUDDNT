import * as React from 'react';
import { Button, View } from 'react-native';

import{ GlobalContext } from '../../../utility/context';

export default function ChatTab() {
  const { globalFunction } = React.useContext(GlobalContext);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Đăng xuất" onPress={globalFunction.signOut}/>
      </View>
    );
  }