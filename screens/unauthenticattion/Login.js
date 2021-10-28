import * as React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, Alert} from 'react-native';

import * as Const from '../../config/Constants';
import { AuthContext } from '../../utility/context';

const Login = (props) => {

  const [dataUser, setDataUser] = React.useState({
    phone: '',
    password: ''
  });
  const { signIn } = React.useContext(AuthContext);

  const register = () => props.navigation.navigate('Tạo tài khoản');

  const handlePhoneChange = (val) => {
    setDataUser({
        ...dataUser,
        phone: val,
    });
  };

  const handlePasswordChange = (val) => {
    setDataUser({
        ...dataUser,
        password: val,
    });
  };

  const handleLogin = () => {
    if ((dataUser.phone !== '12345') || (dataUser.password !== '1')) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        {text: 'Okay'}
      ]);
    return;
    }
    signIn();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Dask </Text>
      <View style={{marginTop: 50}}>
          <TextInput style={styles.textInput} keyboardType="phone-pad" 
          placeholder="Số điện thoại" onChangeText={(val) => handlePhoneChange(val)} />
          <TextInput style={styles.textInput} secureTextEntry={true} 
          placeholder="Mật khẩu" onChangeText={(val) => handlePasswordChange(val)}/>
      </View>

      <View style={styles.buttonContainer}>
      <TouchableHighlight style={styles.button} onPress={handleLogin}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>Đăng nhập</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={{...styles.button, marginTop: 200}} onPress={register}>
        <View style={{...styles.button, backgroundColor: "#42B72A"}}>
          <Text style={styles.buttonTitle}>Tạo tài khoản Dask mới</Text>
        </View>
      </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 25,
      justifyContent: 'center',
    },
    title: {
      marginTop: 80,
      textAlign: 'center',
      fontFamily: 'cookieRegular',
      fontSize: 72,
      fontWeight: "normal",
      color: "black",
    },
    textInput: {
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#8D8686",
      fontSize: 24,
      margin: 6,
    },
    buttonContainer: {
      marginTop: 40,
      justifyContent: "center",
      alignItems: 'center',
    },
    button: {
      width: 320,
      borderRadius: 7,
      marginHorizontal: 'auto',
      backgroundColor: Const.COLOR_THEME,
    },
    buttonTitle: {
      fontSize: 24,
      color: "white",
      padding: 10,
      fontWeight: "600",
      textAlign: 'center',
    },
  });
  
export default Login;