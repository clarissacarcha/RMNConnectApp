import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, icons} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {trimText} from '../utils/helpers';
import {useAppSelector, useAppDispatch} from '../hooks/redux-hooks';
import * as trackPlayerActions from '../store/slices/trackPlayerSlice';
import {RootStackParamList} from '../screens/RootStackParams';
import Slider from '@react-native-community/slider';
import {useProgress} from 'react-native-track-player';
import {moderateScale} from 'src/utils';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
type audioPlayerScreenProps = StackNavigationProp<
  RootStackParamList,
  'Podcast'
>;

const AudioPlayer = () => {
  const trackPlayer = useAppSelector(state => state.trackPlayer);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<audioPlayerScreenProps>();
  const {position} = useProgress();
  const playerState = usePlaybackState();

  const onSliderChange = (value: number) => {
    dispatch(trackPlayerActions.seekToPositionAsync(value));
  };

  const onPlayPauseHandler = () => {
    if (playerState === State.Playing)
      dispatch(trackPlayerActions.pauseTrackAsync());
    else dispatch(trackPlayerActions.playTrackAsync());
  };

  const onAudioPlayerHandler = () => {
    navigation.navigate('TrackPlayer');
  };

  useEffect(() => {
    // console.log(
    //   Math.round(position),
    //   Math.round(trackPlayer.currentTrackDuration - 1),
    //   trackPlayer.currentTrackDuration,
    // );

    if (
      trackPlayer.currentTrackDuration &&
      Math.round(position) === Math.round(trackPlayer.currentTrackDuration - 1)
    ) {
      if (trackPlayer.repeat.one) {
        dispatch(trackPlayerActions.seekToPositionAsync(0));
        dispatch(trackPlayerActions.playTrackAsync());
      } else {
        dispatch(trackPlayerActions.playNextTrackAsync());
      }
    }
  }, [position]);

  console.log(playerState);
  return (
    <View
      style={{
        alignSelf: 'center',
        borderTopLeftRadius: moderateScale(15),
        borderTopRightRadius: moderateScale(15),
        backgroundColor: COLORS.lightBlue,
        position: 'absolute',
        bottom: moderateScale(65),
        zIndex: 1,
        padding: moderateScale(10),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: moderateScale(10),
          height: moderateScale(60),
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            width: moderateScale(430),
          }}
          activeOpacity={0.7}
          onPress={onAudioPlayerHandler}>
          <View style={{marginRight: 10}}>
            {trackPlayer.currentTrack.artwork.length > 0 && (
              <Image
                style={{
                  height: moderateScale(50),
                  width: moderateScale(50),
                  borderRadius: moderateScale(30),
                }}
                source={{uri: trackPlayer.currentTrack.artwork}}
              />
            )}
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{color: COLORS.primaryDark, ...FONTS.bodyBold}}>
              {trimText(trackPlayer.currentTrack.title, 25)} 3u434343jhfkjhdsfjk
              sjfsdk
            </Text>
            <Text style={{color: COLORS.primaryDark, ...FONTS.body}}>
              {trimText(trackPlayer.currentTrack.artist, 25)}
            </Text>

            <Slider
              style={{width: '100%'}}
              thumbImage={icons.circle}
              minimumValue={0}
              maximumValue={trackPlayer.currentTrackDuration}
              tapToSeek={true}
              onValueChange={onSliderChange}
              value={position}
              minimumTrackTintColor={COLORS.blue}
              maximumTrackTintColor={COLORS.white}
            />
          </View>
        </TouchableOpacity>
        <View style={{marginLeft: 'auto', paddingRight: 10}}>
          <TouchableOpacity onPress={onPlayPauseHandler}>
            <Image
              source={playerState === State.Playing ? icons.pause : icons.play}
              style={{
                height: moderateScale(28),
                width: moderateScale(28),
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AudioPlayer;
