import React, { Component } from 'react';
import {Modal, View, StyleSheet,TouchableOpacity, TouchableHighlight, Text} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

export default class BottomPopupSelf extends Component {

    static defaultProps = {
        animationType: 'fade',
        haveOutsideTouch: true,
        data: []
      }

    render() {
    const { show, title, animationType, closePopup, haveOutsideTouch } = this.props;

    return (
        <Modal
            animationType={animationType}
            transparent={true}
            visible={show}
        >
            <View style={{ flex: 1, backgroundColor: '#00000077' }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        if (!haveOutsideTouch) return;
                        closePopup()
                    }}
                    style={{flex: 1}}
                />

                <View style={{
                    bottom: 0,
                    position: 'absolute',
                    width: '100%',
                    backgroundColor: 'white',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    paddingBottom: 5,
                    paddingTop: 5,
                }}>
                    <TouchableHighlight style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}
                    onPress = {() => {console.log('Hi')}}> 
                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
                            <EvilIcons style={styles.icon} name="pencil" size={37} color="black" />
                            <View style={{flex: 1}}>
                                <View style={styles.textWrapper}>
                                    <Text style={styles.firstText}> Chỉnh sửa bài đăng</Text>
                                    <Text style={styles.secondText}> Chỉnh sửa nội dung, ảnh và video</Text>
                                </View>
                                <View style={styles.divider}/>
                            </View>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}
                    onPress = {() => {console.log('Hi')}}> 
                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
                            <EvilIcons style={styles.icon} name="trash" size={37} color="black" />
                            <View style={{flex: 1}}>
                                <View style={styles.textWrapper}>
                                    <Text style={styles.firstText}> Xóa bài đăng</Text>
                                    <Text style={styles.secondText}> Xóa bài đăng này của bạn</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>

                </View>
            </View>
        </Modal>
    )
    }
}

const styles = StyleSheet.create({
    icon: {
        padding: 12,
    },
    firstText: {
        fontSize: 18,
        color: 'black',
        marginBottom: 5, 
    },
    secondText: {
        fontSize: 16
    },
    textWrapper: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    divider: {
        width: '95%',
        height: 1,
        backgroundColor: '#e0e0e0'
    },

})