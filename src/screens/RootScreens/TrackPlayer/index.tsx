import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {useProgress} from 'react-native-track-player';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAppDispatch, useAppSelector} from 'src/hooks/redux-hooks';
import {COLORS, FONTS, icons} from 'src/constants';
import {RootStackParamList} from '../../RootStackParams';
import {secondsToHHMMSS} from 'src/utils/helpers';
import * as trackPlayerActions from 'src/store/slices/trackPlayerSlice';
import TrackPlayers, {
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';
import {moderateScale} from '../../../utils';

type trackPlayerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TrackPlayer'
>;

const MAX_PROGRESS = 300;

const TrackPlayer = ({navigation}: trackPlayerScreenProps) => {
  const trackPlayer = useAppSelector(state => state.trackPlayer);
  const media = useAppSelector(state => state.media);
  const {position} = useProgress();
  const dispatch = useAppDispatch();

  const onSliderChange = (value: number) => {
    dispatch(trackPlayerActions.seekToPositionAsync(value));
  };

  const onPreviousTrackHandler = async () => {
    if (position < 3) {
      await dispatch(trackPlayerActions.playPrevTrackAsync());
      if (trackPlayer.repeat.one)
        await dispatch(trackPlayerActions.repeatAll());
    } else {
      await dispatch(trackPlayerActions.seekToPositionAsync(0));
    }
  };

  const onPlayPauseHandler = () => {
    if (trackPlayer.isTrackPlaying)
      dispatch(trackPlayerActions.pauseTrackAsync());
    else dispatch(trackPlayerActions.playTrackAsync());
  };

  const onNextTrackHandler = async () => {
    await dispatch(trackPlayerActions.playNextTrackAsync());
    if (trackPlayer.repeat.one) await dispatch(trackPlayerActions.repeatAll());
  };

  const onShuffleHandler = () => {
    if (trackPlayer.isShuffle)
      dispatch(trackPlayerActions.unShuffleTracksAsync());
    else dispatch(trackPlayerActions.shuffleTracksAsync());
  };

  const onRepeatHandler = () => {
    if (!trackPlayer.repeat.one && !trackPlayer.repeat.all) {
      dispatch(trackPlayerActions.repeatAll());
    } else if (!trackPlayer.repeat.one && trackPlayer.repeat.all) {
      dispatch(trackPlayerActions.repeatOne());
    } else {
      dispatch(trackPlayerActions.unsetRepeat());
    }
  };
  // useTrackPlayerEvents([Event.PlaybackTrackChanged], (event: any) => {
  //   console.log(event);

  //   TrackPlayers.getCurrentTrack().then(index =>
  //     dispatch(trackPlayerActions.setCurrentTrackAsync(index)),
  //   );
  //   // if (event.state === State.nextT) {
  //   //   TrackPlayer.getCurrentTrack().then(index => setCurrentTrack(index));
  //   // }
  // });

  useEffect(() => {
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

  return (
    <SafeAreaView style={{backgroundColor: COLORS.black, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <LinearGradient
          style={styles.upperLinearGradient}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          colors={[
            'rgba(7, 7, 7, 0.00)',
            'rgba(7, 7, 7, 0.55)',
            COLORS.lightGray3,
          ]}
        />
        <TouchableOpacity
          style={styles.downArrowContainer}
          onPress={() => navigation.goBack()}>
          <Image
            style={{height: 22, width: 22, tintColor: COLORS.white}}
            source={icons.down_arrow}
          />
        </TouchableOpacity>
      </View>
      {/* foreground */}
      <View style={{paddingHorizontal: 30}}>
        {/* track info */}
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{color: COLORS.white, textAlign: 'center', ...FONTS.body}}>
            PLAYING FROM TAGALOG
          </Text>
          <Text
            style={{
              color: COLORS.white,
              textAlign: 'center',
              ...FONTS.bodyBold,
            }}>
            {trackPlayer.currentTrack.title.toUpperCase()}
          </Text>
          {/* <Text
            style={{
              color: COLORS.lightGray,
              textAlign: 'center',
              ...FONTS.body,
            }}>
            {trackPlayer.currentTrack.artist.toUpperCase()}
          </Text> */}
          <View style={styles.trackInfoContainer}>
            <Image
              style={{
                height: moderateScale(300),
                width: moderateScale(300),
                borderRadius: moderateScale(20),
              }}
              resizeMode={'cover'}
              source={{uri: trackPlayer.currentTrack.artwork}}
            />
          </View>
        </View>

        <View style={{marginBottom: moderateScale(10)}}>
          <Text style={{color: COLORS.white, ...FONTS.h4}}>
            {trackPlayer.currentTrack.title.toUpperCase()}
          </Text>
          <Text style={{color: COLORS.white, ...FONTS.p}}>episode 1</Text>
        </View>
        {/* progress bar  */}
        <View style={styles.progressBarContainer}>
          <Slider
            thumbImage={icons.circle}
            style={{width: '100%', height: moderateScale(20)}}
            minimumValue={0}
            maximumValue={trackPlayer.currentTrackDuration}
            tapToSeek={true}
            onValueChange={onSliderChange}
            value={position}
            minimumTrackTintColor={COLORS.blue}
            maximumTrackTintColor={COLORS.white}
            // disabled={true}
          />
        </View>
        {/* time */}
        <View style={styles.progressBarTimeContainer}>
          <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
            {secondsToHHMMSS(position)}
          </Text>
          <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
            {secondsToHHMMSS(trackPlayer.currentTrackDuration)}
          </Text>
        </View>
        {/* controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={onShuffleHandler} activeOpacity={0.7}>
            <Image
              source={icons.shuffle}
              style={{
                height: 28,
                width: 28,
                tintColor: trackPlayer.isShuffle
                  ? COLORS.primary
                  : COLORS.white,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPreviousTrackHandler}
            activeOpacity={0.7}>
            <Image
              source={icons.previous}
              style={{height: 25, width: 25, tintColor: COLORS.white}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPlayPauseHandler}
            style={styles.playPauseContainer}
            activeOpacity={0.7}>
            <Image
              source={trackPlayer.isTrackPlaying ? icons.pause : icons.play}
              style={{height: 25, width: 25, tintColor: COLORS.black}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNextTrackHandler} activeOpacity={0.7}>
            <Image
              source={icons.next}
              style={{height: 25, width: 25, tintColor: COLORS.white}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onRepeatHandler} activeOpacity={0.7}>
            <Image
              source={
                trackPlayer.repeat.all
                  ? icons.repeat
                  : trackPlayer.repeat.one
                  ? icons.repeat_one
                  : icons.repeat
              }
              style={{
                height: 25,
                width: 25,
                tintColor:
                  trackPlayer.repeat.all || trackPlayer.repeat.one
                    ? COLORS.primary
                    : COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{margin: moderateScale(20), alignItems: 'center'}}>
          <Text style={{color: COLORS.white, ...FONTS.p}}>RMN SIKAT V.1.0</Text>
          <Text style={{color: COLORS.white, ...FONTS.p}}>
            All Rights Reserved 2022
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  upperLinearGradient: {
    height: moderateScale(500),
    width: '100%',
    position: 'absolute',
    top: 30,
  },
  downArrowContainer: {
    paddingLeft: 15,
    justifyContent: 'center',
    marginTop: moderateScale(30),
  },
  headerInfoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30,
  },
  lowerLinearGradient: {
    height: 150,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  trackInfoContainer: {
    alignItems: 'center',
    marginVertical: moderateScale(30),
  },
  progressBarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  playPauseContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TrackPlayer;
