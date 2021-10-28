import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import * as Register from './Register';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login}/>
        <Stack.Screen name="Tạo tài khoản" component={Register.Register1} />
        <Stack.Screen name="Số điện thoại" component={Register.Register2} />
      </Stack.Navigator>
  );
};

export default LoginStack;