import * as React from 'react';
import { Button, View } from 'react-native';

import{ AuthContext } from '../../utility/context';

export default function ChatTab() {
  const { signOut } = React.useContext(AuthContext);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Đăng xuất" onPress={signOut}/>
      </View>
    );
  }