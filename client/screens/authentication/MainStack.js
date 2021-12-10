import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Camera from './diarytab/Camera';
import MainTab from './MainTab';
import {Post, PostButton} from './diarytab/Post';
import {EditPost, EditPostButton} from './diarytab/EditPost';
import ImagePicker from './diarytab/ImagePicker';
import VideoPicker from './diarytab/VideoPicker';
import Preview from './diarytab/Preview';
import VideoCamera from './diarytab/VideoCamera';
import PreviewVideo from './diarytab/PreviewVideo';

const Stack = createNativeStackNavigator();

export default function MainStack(){

    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Main tab" component={MainTab}/>
            <Stack.Screen name="Post" component={Post} 
            options = {{
                title: 'Tạo bài viết',
                headerRight: () => (
                    <PostButton />
                  ),
            }} />
            <Stack.Screen name="EditPost" component={EditPost} 
            options = {{
                title: 'Sửa bài viết',
                headerRight: () => (
                    <EditPostButton />
                  ),
            }} />
            <Stack.Screen name='Chọn ảnh' component={ImagePicker} />
            <Stack.Screen name='Chọn video' component={VideoPicker} />
            <Stack.Screen options={{headerShown: false}} name='Camera' component={Camera} />
            <Stack.Screen options={{headerShown: false}} name='Preview' component={Preview} />
            <Stack.Screen options={{headerShown: false}} name= 'VideoCamera' component={VideoCamera} />
            <Stack.Screen options={{headerShown: false}} name= 'PreviewVideo' component={PreviewVideo} />
        </Stack.Navigator>
    );
}
