import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {useAppSelector} from '../hooks/redux-hooks';
import {RootStackParamList} from 'src/screens/RootStackParams';
import {Home, Podcast} from 'src/screens';
import {TabBarIcon, AudioPlayer} from 'src/components';
import {COLORS} from 'src/constants';
import {moderateScale} from 'src/utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootStackParamList>();

// const ProfileStack = () => {
//   return (
//     <Stack.Navigator screenOptions={() => ({headerShown: false})}>
//       <Stack.Screen name="Profile" component={Profile} />
//       <Stack.Screen name="Media" component={Media} />
//     </Stack.Navigator>
//   );
// };

// const LibraryStack = () => {
//   return (
//     <Stack.Navigator screenOptions={() => ({headerShown: false})}>
//       <Stack.Screen name="Library" component={Library} />
//       <Stack.Screen name="Media" component={Media} />
//     </Stack.Navigator>
//   );
// };
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={() => ({headerShown: false})}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Podcast" component={Podcast} />
      {/* <Stack.Screen name="Media" component={Media} /> */}
    </Stack.Navigator>
  );
};
// const SearchStack = () => {
//   return (
//     <Stack.Navigator screenOptions={() => ({headerShown: false})}>
//       <Stack.Screen name="Search" component={Search} />
//       <Stack.Screen name="Media" component={Media} />
//     </Stack.Navigator>
//   );
// };

const HomeTabs = () => {
  const trackPlayer = useAppSelector(state => state.trackPlayer);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor:
          trackPlayer.currentTrack.url.length > 0
            ? COLORS.lightBlue
            : COLORS.black,
      }}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            return <TabBarIcon isFocused={focused} name={route.name} />;
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            marginTop: moderateScale(
              trackPlayer.currentTrack.url.length > 0 ? 6 : 0,
            ),
            backgroundColor: COLORS.white,
            borderTopRightRadius: moderateScale(20),
            borderTopLeftRadius: moderateScale(20),
            height: moderateScale(60 + insets.bottom),
            shadowColor: COLORS.blue,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 2,
            shadowRadius: 4.65,
            elevation: 7,
          },
        })}>
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="SearchStack" component={HomeStack} />
        {/* <Tab.Screen name="SearchStack" component={SearchStack} />
        <Tab.Screen name="LibraryStack" component={LibraryStack} />
        <Tab.Screen name="ProfileStack" component={ProfileStack} /> */}
      </Tab.Navigator>
      {trackPlayer.currentTrack?.url?.length > 0 && <AudioPlayer />}
    </View>
  );
};

export default HomeTabs;
