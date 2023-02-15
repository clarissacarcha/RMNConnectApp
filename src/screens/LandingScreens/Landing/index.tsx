import React, {useEffect, useRef} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';

import {SIZES, COLORS} from 'src/constants';
import {useAppDispatch, useAppSelector} from 'src/hooks/redux-hooks';
// import * as userActions from '../store/slices/userSlice';
// import * as playlistActions from '../store/slices/playlistSlice';
import * as trackPlayerActions from 'src/store/slices/trackPlayerSlice';
import {ref, onValue, push, update, remove} from 'firebase/database';
// import {db} from '../../../../firebase-config.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {moderateScale, auth} from 'src/utils';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GoogleAuthProvider} from 'firebase/auth';
import InstagramLogin from 'react-native-instagram-login';

GoogleSignin.configure({
  webClientId:
    '1053099296823-0s2683vo9fvhfcp9clqr79nm7v5o43sr.apps.googleusercontent.com',
});

const Landing = () => {
  const dispatch = useAppDispatch();
  const instagramLoginRef = useRef<any>(null);
  useEffect(() => {
    dispatch(trackPlayerActions.initAsync());
    // return () => dispatch(trackPlayerActions.resetPlayerAsync());
  }, [dispatch]);

  useEffect(() => {
    // console.log('haha', db);
    // onValue(ref(db, '/users'), querySnapShot => {
    //   let data = querySnapShot.val() || {};
    //   console.log(data);
    // });
  }, []);

  const handleAdd = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredential);
      // Sign-in the user with the credential
      const res = await auth().signInWithCredential(googleCredential);
    } catch (e: any) {
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (e.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleSignOut = async () => {
    try {
      // await GoogleSignin.revokeAccess();
      // await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => {
          console.log('user success logout');
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFBLogin = async () => {
    // Attempt login with permissions
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      console.log(facebookCredential);
      // Sign-in the user with the credential
      const res = await auth().signInWithCredential(facebookCredential);

      // return
    } catch (e: any) {
      if (
        e
          .toString()
          .includes('An account already exists with the same email address')
      ) {
        alert(
          'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
        );
      }
    }
  };

  const handleInstagramLogin = async () => {
    // Attempt login with permissions
    try {
      const provider = new GoogleAuthProvider();

      console.log(provider);
      auth().signInWithPopup(provider);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <TouchableOpacity
          onPress={handleAdd}
          style={{
            backgroundColor: '#E1AD01',
            alignItems: 'center',
            justifyContent: 'center',
            height: moderateScale(40),
            borderRadius: moderateScale(10),
          }}>
          <Text style={{color: 'white'}}>LOGIN WITH GMAIL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            backgroundColor: '#E1AD01',
            alignItems: 'center',
            justifyContent: 'center',
            height: moderateScale(40),
            borderRadius: moderateScale(10),
          }}>
          <Text style={{color: 'white'}}>SIGN OUT WITH GMAIL</Text>
        </TouchableOpacity>
        <View style={{marginVertical: 20}}>
          <TouchableOpacity
            onPress={handleFBLogin}
            style={{
              backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'center',
              height: moderateScale(40),
              borderRadius: moderateScale(10),
            }}>
            <Text style={{color: 'white'}}>LOGIN WITH FACEBOOK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'center',
              height: moderateScale(40),
              borderRadius: moderateScale(10),
            }}>
            <Text style={{color: 'white'}}>SIGN OUT WITH FACEBOOK</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 20}}>
          <TouchableOpacity
            onPress={() => instagramLoginRef.current.show()}
            style={{
              backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'center',
              height: moderateScale(40),
              borderRadius: moderateScale(10),
            }}>
            <Text style={{color: 'white'}}>LOGIN WITH INSTAGRAM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'center',
              height: moderateScale(40),
              borderRadius: moderateScale(10),
            }}>
            <Text style={{color: 'white'}}>SIGN OUT WITH INSTAGRAM</Text>
          </TouchableOpacity>
        </View>
        <InstagramLogin
          ref={instagramLoginRef}
          appId="5571503969625381"
          appSecret="e5ebe37e159a73dac36140a3d0bf4dff"
          redirectUrl="https://rmn.ph/"
          scopes={['user_profile', 'user_media']}
          onLoginSuccess={token => {
            console.log(token);
          }}
          onLoginFailure={data => console.log(data)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SIZES.paddingTopDefault,
    backgroundColor: COLORS.black,
  },
  contentWrapper: {
    paddingHorizontal: SIZES.paddingHorizontalDefault,
    paddingBottom: 90,
  },
});

export default Landing;
