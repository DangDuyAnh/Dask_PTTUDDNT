import * as React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, TextInput } from "react-native";
import * as Const from '../../config/Constants';

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 24,
    fontWeight: 'normal',
    color: 'black',
    textAlign: 'center',
  },
  buttonOut: {
    position: 'absolute',
    marginTop: 500,
    marginHorizontal: 'auto',
    backgroundColor: Const.COLOR_THEME,
    width: 320,
    borderRadius: 7,
  },
  button: {
    marginHorizontal: 'auto',
    backgroundColor: Const.COLOR_THEME,
    width: 320,
    borderRadius: 7,
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  textInput: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#8D8686",
    fontSize: 24,
    marginTop: 50,
    width: 350
  },
});

export const Register1 = ({ navigation }) => {

    const onPress1 = () => navigation.navigate('Số điện thoại');

    return (
      <View style={{ alignItems: 'center' }}>
      <View style={styles.container}>
          <Text style={styles.title}>Tham gia Dask</Text>
          <Text style={styles.description}>Chúng tôi sẽ giúp bạn tạo tài khoản mới sau vài bước dễ dàng</Text>
      </View>
      <TouchableHighlight style={styles.buttonOut} onPress={onPress1}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>Next</Text>
            </View>
      </TouchableHighlight>
      </View>
    );
  };

  export const Register2 = ({ navigation }) => {

    return (
      <View style={{ alignItems: 'center' }}>
      <View style={styles.container}>
          <Text style={styles.title}>Nhập số di động của bạn</Text>
          <Text style={styles.description}>Nhập số điện thoại để mọi người có thể liên hệ với bạn</Text>
          <TextInput style={styles.textInput} keyboardType="phone-pad" placeholder="Nhập số di động"/>
      </View>
      <TouchableHighlight style={styles.buttonOut}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>Next</Text>
            </View>
      </TouchableHighlight>
      </View>
    );
  };