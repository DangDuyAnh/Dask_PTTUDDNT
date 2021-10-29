import * as React from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, TextInput } from "react-native";
import DatePicker from 'react-native-date-picker';
import { MaterialIcons } from '@expo/vector-icons';

import * as Const from '../../config/Constants';

const styles = StyleSheet.create({
  backGround: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 22,
    fontWeight: 'normal',
    color: 'black',
    textAlign: 'center',
  },
  buttonOut: {
    backgroundColor: 'white',
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
    fontSize: 22,
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
      <View style={styles.backGround}>
      <View style={styles.container}>
          <Text style={styles.title}>Tham gia Dask</Text>
          <Text style={styles.description}>Chúng tôi sẽ giúp bạn tạo tài khoản mới sau vài bước dễ dàng</Text>
      </View>
      <TouchableHighlight style={styles.buttonOut} onPress={onPress1}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>Tiếp</Text>
            </View>
      </TouchableHighlight>
      </View>
    );
  };

  export const Register2 = ({ navigation }) => {

    const onPress2 = () => navigation.navigate('Tên');

    return (
      <View style={styles.backGround}>
      <View style={styles.container}>
          <Text style={styles.title}>Nhập số di động của bạn</Text>
          <Text style={styles.description}>Nhập số điện thoại để mọi người có thể liên hệ với bạn</Text>
          <TextInput style={styles.textInput} keyboardType="phone-pad" placeholder="Nhập số di động"/>
      </View>
      <TouchableHighlight style={styles.buttonOut} onPress={onPress2}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>Tiếp</Text>
            </View>
      </TouchableHighlight>
      </View>
    );
  };

  export const Register3 = ({ navigation }) => {

    const onPress3 = () => navigation.navigate('Ngày sinh');

    return (
      <View style={styles.backGround}>
      <View style={styles.container}>
          <Text style={styles.title}>Bạn tên gì?</Text>
          <Text style={styles.description}>Nhập tên bạn sử dụng trong đời thực</Text>
          <TextInput style={styles.textInput} placeholder="Tên đầy đủ"/>
      </View>
      <TouchableHighlight style={styles.buttonOut} onPress={onPress3}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>Tiếp</Text>
            </View>
      </TouchableHighlight>
      </View>
    )
  }

  export const Register4 = ({ navigation }) => {

    const onPress4 = () => navigation.navigate('Giới tính');
    const [date, setDate] = React.useState(new Date());

    return (
      <View style={styles.backGround}>
      <View style={styles.container}>
          <Text style={styles.title}>Sinh nhật của bạn khi nào?</Text>
          <Text style={styles.description}>Chọn ngày sinh của bạn</Text>
          <DatePicker style={{ marginTop:5 }} DatePicker date={date} onDateChange={setDate}
           locale='vi' mode="date" androidVariant = 'nativeAndroid' />
      </View>
      <TouchableHighlight style={styles.buttonOut} onPress={onPress4}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>Tiếp</Text>
            </View>
      </TouchableHighlight>
      </View>
    )
  }

  export const Register5 = ({ navigation }) => {

    const onPress4 = () => navigation.navigate('Mật khẩu');
    const [female, setFemale] = React.useState(true);
    const [male, setMale] = React.useState(false);
    const [option, setOption] = React.useState(false);

    const handleFemale = () => {
      setFemale(true);
      setMale(false);
      setOption(false);
    }

    const handleMale = () => {
      setFemale(false);
      setMale(true);
      setOption(false);
    }

    const handleOption = () => {
      setFemale(false);
      setMale(false);
      setOption(true);
    }

    return (
      <View style={styles.backGround}>
      <View style={{...styles.container, marginTop: 50}}>
          <Text style={styles.title}>Giới tính của bạn là gì?</Text>
          <Text style={styles.description}>Chọn giới tính của bạn</Text>
      <View style={{ marginTop: 40}}>
        <View style={{ marginBottom: 25}}>
          <View style={{ flexDirection:"row", width: 350, justifyContent: "space-between"}}>
            <Text style={{ fontWeight: "600", fontSize: 22, color:"black"}}>Nữ</Text>
            <TouchableOpacity onPress={handleFemale}>
              <MaterialIcons name={female?"radio-button-checked":"radio-button-unchecked"} 
              size={30} color={female?"#2740C9":"black"} />
            </TouchableOpacity>
          </View>
          <View style={{ borderBottomColor: '#8D8686', borderBottomWidth: 1, width: 350, marginTop: 20}} />
        </View>

        <View style={{ marginBottom: 25}}>
          <View style={{ flexDirection:"row", width: 350, justifyContent: "space-between"}}>
            <Text style={{ fontWeight: "600", fontSize: 22, color:"black"}}>Nam</Text>
            <TouchableOpacity onPress={handleMale}>
              <MaterialIcons name={male?"radio-button-checked":"radio-button-unchecked"} 
              size={30} color={male?"#2740C9":"black"} />
            </TouchableOpacity>
          </View>
          <View style={{ borderBottomColor: '#8D8686', borderBottomWidth: 1, width: 350, marginTop: 20}} />
        </View>

        <View style={{ marginBottom: 25}}>
          <View style={{ flexDirection:"row", width: 350, justifyContent: "space-between"}}>
            <View style={{ width: 300}}>
              <Text style={{ fontWeight: "600", fontSize: 22, color:"black"}}>Tùy chỉnh</Text>
              <Text style={{ fontWeight: "normal", fontSize: 16, color:"black", paddingTop:10}}>
              Chọn Tùy chỉnh nếu bạn thuộc giới tính khác hoặc không muốn tiết lộ
              </Text>
            </View>
            <View style={{ justifyContent: "center"}}>
            <TouchableOpacity onPress={handleOption}>
              <MaterialIcons name={option?"radio-button-checked":"radio-button-unchecked"} 
              size={30} color={option?"#2740C9":"black"} />
            </TouchableOpacity>
            </View>
          </View>
          <View style={{ borderBottomColor: '#8D8686', borderBottomWidth: 1, width: 350, marginTop: 10}} />
        </View>

      </View>
      </View>
      <TouchableHighlight style={styles.buttonOut} onPress={onPress4}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>Tiếp</Text>
            </View>
      </TouchableHighlight>
      </View>
    )
  }

  export const Register6 = ({ navigation }) => {

    const onPress6 = () => navigation.navigate('Điều khoản và quyền riêng tư');

    return (
      <View style={styles.backGround}>
      <View style={styles.container}>
          <Text style={styles.title}>Chọn mật khẩu</Text>
          <Text style={styles.description}>Tạo mật khẩu dài từ 6 đến 10 ký tự. </Text>
          <Text style={styles.description}>Đó là mật khẩu người khác không thể đoán được</Text>
          <TextInput style={styles.textInput} placeholder="Mật khẩu" secureTextEntry={true}/>
      </View>
      <TouchableHighlight style={styles.buttonOut} onPress={onPress6}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>Tiếp</Text>
            </View>
      </TouchableHighlight>
      </View>
    )
  }

  export const Register7 = ({ navigation }) => {

    return (
      <View style={styles.backGround}>
      <View style={styles.container}>
          <Text style={styles.title}>Hoàn tất đăng ký</Text>
          <Text style={styles.description}>Bằng cách nhấn vào nút Đăng ký, 
          bạn đồng ý tạo tài khoản sử dụng dịch vụ của chúng tôi </Text>
      </View>
      <TouchableHighlight style={styles.buttonOut}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>Đăng ký</Text>
            </View>
      </TouchableHighlight>
      </View>
    )
  }

  export const Register8 = ({ navigation }) => {

    return (
      <View style={styles.backGround}>
      <View style={styles.container}>
          <Text style={styles.title}>Hoàn tất đăng ký</Text>
          <Text style={styles.description}>Bằng cách nhấn vào nút Đăng ký, 
          bạn đồng ý tạo tài khoản sử dụng dịch vụ của chúng tôi </Text>
      </View>
      <TouchableHighlight style={styles.buttonOut}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>Đăng ký</Text>
            </View>
      </TouchableHighlight>
      </View>
    )
  }