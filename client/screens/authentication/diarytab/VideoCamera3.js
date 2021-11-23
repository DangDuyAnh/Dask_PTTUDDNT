'use strict';
import React, { useRef, useState, useEffect } from 'react';
import {NativeModules, LayoutAnimation, StyleSheet, TouchableOpacity, View, StatusBar, BackHandler, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import CircularProgress from '../../../components/CircularProgress';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

let isRecord = 0;
let isBack = 0;
let interval
export default function CameraVideo (props) {
    const camera = useRef(null);
    const [cameraBack, setCameraBack] = useState(true);
    const [cameraState, setCameraState] = useState(0); // 0 là đang tắt, 1 là đang quay
    const [cameraTouch, setCameraTouch] = useState(0);
    const [clock, setClock] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [myInterval, setMyInterval] = useState(null);
    const [cameraButton, setCameraButton] = useState({
        w: 48,
        h: 48,
        r: 24});

    const backAction = () => {
      if (isRecord === 0) {
        props.navigation.goBack(null);
      }
      if (isRecord === 1) {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => {
          isBack = 1;
          // clearInterval(myInterval);
          clearInterval(interval)
          // stopRecording();
          props.navigation.goBack(null);
        }}
      ]);
    }
      return true
    }

    useEffect(() => {
      isBack = 0;

      BackHandler.addEventListener('hardwareBackPress', backAction);
  
      // const backHandler = BackHandler.addEventListener(
      //   "hardwareBackPress",
      //   backAction
      // );
  
      return () => {
        // setCameraBack(true);
        // setCameraState(0);
        // setCameraTouch(0);
        // setClock(0);
        // setIsRecording(false);
        // backHandler.remove();
        // clearInterval(interval);
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, []);

    const startRecording = async () => {
      try {
        isRecord = 1;
        setCameraTouch(1);
        LayoutAnimation.spring();
        setCameraButton({w: 46, h: 46, r: 5});
        setCameraState(1);
        startClock();
        setIsRecording(true);
        const promise = await camera.current.recordAsync();
        if (promise) {
          const data = await promise;
          setIsRecording(false);
          if (isBack === 0)
            props.navigation.navigate('PreviewVideo', {data: data});
        }
      } catch (e) {
        console.error(e);
      }
    }

    const stopRecording = () => {
      camera.current.stopRecording();
      LayoutAnimation.spring();
      setCameraButton({w: 50, h: 50, r: 25});
      setCameraState(0);
      setCameraTouch(0);
      console.log('done');
      // clearInterval(myInterval);
      clearInterval(interval)
    }


    const startClock = () => {
      let i = 0;
      // let interval = setInterval(() => {
      interval = setInterval(() => {
        // setMyInterval(interval);
        setClock(i)
        console.log(i);
        i= i + 1;
        if (i > 39) {
          clearInterval(interval);
          console.log('done2');
          stopRecording();
        }
      }, 1000);
    }

    const _onPress = () => {
        if (cameraTouch === 0) {
          startRecording();
        }

        if (cameraTouch === 1) {
          if(clock < 5) {
            console.log('yes')
            setTimeout(() => {
              stopRecording();
            }, (3 - clock)*1000);
            }

          else {
            stopRecording();
          }
        }
      }

    const navigationBack = () => {
      props.navigation.goBack();
    }

    const switchCamera = () => {
      setCameraBack(!cameraBack);
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <RNCamera
          ref = {camera}
          ratio='16:9'
          style={styles.preview}
          type={(cameraBack)?RNCamera.Constants.Type.back:RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          defaultVideoQuality={RNCamera.Constants.VideoQuality["480p"]}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={navigationBack} disabled={isRecording}>
            <Feather name="arrow-left" size={40} color={isRecording?"#ffffff44":"white"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={switchCamera} disabled={isRecording}>
            <MaterialIcons name="flip-camera-android" size={40} color={isRecording?"#ffffff44":"white"} />
          </TouchableOpacity>
        </View>

        <View style={styles.captureWrapper}>
            {(cameraState===1)&&<CircularProgress />}
            <TouchableOpacity style={[styles.capture, {width: cameraButton.w, 
                height: cameraButton.h, borderRadius: cameraButton.r}]} onPress={_onPress}>
                <View style={styles.capture} />
            </TouchableOpacity>

        </View>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    backgroundColor: '#f44336',
  },
  captureWrapper: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%'
  },
});
