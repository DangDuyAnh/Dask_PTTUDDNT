import * as React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { NavigationContainer } from '@react-navigation/native';

import { GlobalContext } from './utility/context';
import WaitScreen from './screens/unauthenticattion/WaitScreen';
import LoginStack from './screens/unauthenticattion/LoginStack';
import MainStack from './screens/authentication/MainStack';
import { navigationRef } from './RootNavigation';

function App() {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const globalReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case 'UPDATE_POST_DESCRIPTION':
        return {
          ...prevState,
          postDescription: action.post
        }
      case 'UPDATE_POST_IMAGES':
        return {
          ...prevState,
          postImages: action.images
        }
      case 'UPDATE_POST_VIDEO':
        return {
          ...prevState,
          postVideo: action.video
        }
    }
  };
  const [globalState, dispatch] = React.useReducer(globalReducer, initialLoginState);

  const globalFunction = React.useMemo(
    () => ({
      updatePostDescription: (data) => {
        dispatch({ type: 'UPDATE_POST_DESCRIPTION', post: data });
      },
      updatePostImages: (data) => {
        dispatch({ type: 'UPDATE_POST_IMAGES', images: data });
      },
      updatePostVideo: (data) => {
        dispatch( {type: 'UPDATE_POST_VIDEO', video: data});
      },
      signIn: async (data) => {
        try {
          await EncryptedStorage.setItem('userToken', data.token);
          await EncryptedStorage.setItem('user', 
            JSON.stringify({
              user : data.user,
          }));
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'LOGIN', token: data.token });
      },
      signOut: async() => {
        try {
          await EncryptedStorage.removeItem('user');
          await EncryptedStorage.removeItem('userToken');
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
    }),
    []
  );

  React.useEffect(() => {
    setTimeout(async() => {
    // const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await EncryptedStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    // bootstrapAsync();
    }, 1000);
  }, []);


  if( globalState.isLoading ) {
    return(
      <WaitScreen />
    );
  }

  return (
    <GlobalContext.Provider value={{globalState: globalState, globalFunction}}>
      <NavigationContainer ref={navigationRef}>
      { globalState.userToken !== null ? 
      <MainStack />
      : <LoginStack /> }
      </NavigationContainer>
    </GlobalContext.Provider>
  )
}

export default App;
