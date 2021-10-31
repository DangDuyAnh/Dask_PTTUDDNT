import * as React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from './utility/context';
import WaitScreen from './screens/unauthenticattion/WaitScreen';
import LoginStack from './screens/unauthenticattion/LoginStack';
import MainTab from './screens/authentication/MainTab';

function App() {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
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
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        try {
          await EncryptedStorage.setItem('userToken', 
            JSON.stringify({
              token : data.token,
          }));
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
          await EncryptedStorage.removeItem('userToken');
          await EncryptedStorage.removeItem('user');
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


  if( loginState.isLoading ) {
    return(
      <WaitScreen />
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
      { loginState.userToken !== null ? <MainTab /> : <LoginStack /> }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App;
