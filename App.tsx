import React, {useEffect, useState} from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {RootStackParamList, TrackPlayer, Landing} from 'src/screens';
import {HomeTabs} from 'src/navigation';
import {COLORS} from 'src/constants';
import {useAppDispatch, useAppSelector} from 'src/hooks/redux-hooks';
import * as trackPlayerActions from 'src/store/slices/trackPlayerSlice';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {auth} from 'src/utils';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const dispatch = useAppDispatch();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  const onAuthStateChanged = user => {
    console.log(user);

    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    return () => {
      try {
        dispatch(trackPlayerActions.resetPlayerAsync());
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  // if (initializing) return null;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.black}}>
      <StatusBar
        translucent={true}
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={() => ({
            headerShown: false,
            tabBarShowLabel: false,
          })}>
          {/* <Stack.Group>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen
              name="TrackPlayer"
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              }}
              component={TrackPlayer}
            />
          </Stack.Group> */}
          <Stack.Screen name="Landing" component={Landing} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
