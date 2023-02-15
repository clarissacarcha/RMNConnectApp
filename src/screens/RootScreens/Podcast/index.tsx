import React, {useEffect, memo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, View, StatusBar, StyleSheet, Image, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {RootStackParamList} from 'src/screens';

import {useAppDispatch, useAppSelector} from 'src/hooks/redux-hooks';
import {COLORS, FONTS, icons, SIZES} from 'src/constants';
import {trimText} from 'src/utils/helpers';
// import {LoadingSpinner, MediaHeader, MediaItem} from '../components';
// import * as mediaActions from '../store/slices/mediaSlice';
import * as trackPlayerActions from 'src/store/slices/trackPlayerSlice';
import {
  animateOpacity,
  animateHeight,
  animateScale,
} from 'src/utils/animations';

import {TextTitle} from 'src/components';
import TrackPlayers, {
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';

type tracksScreenProps = NativeStackScreenProps<RootStackParamList, 'Podcast'>;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const music = [
  {
    title: 'death bed',
    artist: 'Powfu',
    artwork:
      'https://images-na.ssl-images-amazon.com/images/I/A1LVEJikmZL._AC_SX425_.jpg',
    url: 'https://sample-music.netlify.app/death%20bed.mp3',
    id: '1',
  },
  {
    title: 'bad liar',
    artist: 'Imagine Dragons',
    artwork:
      'https://images-na.ssl-images-amazon.com/images/I/A1LVEJikmZL._AC_SX425_.jpg',
    url: 'https://sample-music.netlify.app/Bad%20Liar.mp3',
    id: '2',
  },
  {
    id: '2',
    url: 'https://www.chosic.com/wp-content/uploads/2021/05/inossi-got-you.mp3',
    title: 'Got You',
    artist: '',
    artwork: 'https://picsum.photos/id/103/200/300',
  },
];
const Podcast = ({route: {params}, navigation}: tracksScreenProps) => {
  const scrollY = useSharedValue(0);
  // const {mediaId, mediaType} = params;
  const media = useAppSelector(state => state.media);
  const trackPlayer = useAppSelector((state: any) => state.trackPlayer);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  // const {
  //   tracks: {items},
  // } = media;
  // useEffect(() => {
  //   if (mediaType === MEDIA.playlist) {
  //     dispatch(mediaActions.getPlaylistTracksAsync(mediaId));
  //   } else if (mediaType === MEDIA.album) {
  //     dispatch(mediaActions.getAlbumsTracksAsync(mediaId));
  //   } else if (mediaType === MEDIA.artist) {
  //     dispatch(mediaActions.getArtistTracksAsync(mediaId));
  //   }
  // }, [mediaId, mediaType, dispatch]);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (isMounted) {
      TrackPlayers.getCurrentTrack().then(index => {
        dispatch(trackPlayerActions.setCurrentTrackAsync(index));
      });
    } else {
      setIsMounted(true);
    }
  });

  useEffect(() => {
    dispatch(trackPlayerActions.setTracks(music));
    dispatch(trackPlayerActions.setTrackskAsync(music));
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const onMediaItemHandler = async ({item, index}: any) => {
    const status = await TrackPlayers.getState();

    // const selectedTrack = item;
    // if (trackPlayer.searchTerm.length > 0) {
    //   dispatch(trackPlayerActions.setSearchTerm(''));
    // }
    await TrackPlayers.skip(index);
    if (status === State.Ready) {
      await dispatch(trackPlayerActions.playTrackAsync());
      await dispatch(trackPlayerActions.setCurrentTrackAsync(index));
    }

    // if (trackPlayer.isShuffle) {
    //   dispatch(trackPlayerActions.shuffleTracksAsync());
    // }
  };

  return (
    <View style={{backgroundColor: COLORS.black, flex: 1}}>
      <StatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={COLORS.black}
      />
      <Animated.View
        style={[
          styles.headerContainer,
          animateHeight(scrollY),
          // animateOpacity(scrollY),
        ]}>
        <LinearGradient
          style={styles.linearGradient}
          colors={[
            COLORS.black,
            COLORS.black,
            COLORS.black,
            'rgba(7, 7, 7, 0.55)',
            'rgba(7, 7, 7, 0.50)',
          ]}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Image style={[styles.backIcon]} source={icons.back} />
        </TouchableOpacity>
        <Text style={{color: COLORS.white, ...FONTS.h3}}>
          Until I Found You
        </Text>
      </Animated.View>
      <Animated.View>
        <AnimatedFlatList
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          ListHeaderComponent={() => {
            return (
              <Animated.View style={styles.containerView}>
                {/* <TouchableOpacity
                  style={{
                    position: 'absolute',
                    zIndex: 3,
                    width: '100%',
                    top: 0,
                  }}
                  activeOpacity={0.7}
                  onPress={() => navigation.goBack()}>
                  <Image style={styles.headerBack} source={icons.back} />
                </TouchableOpacity> */}
                {/* <Animated.View style={[styles.image, animateScale(scrollY)]}> */}
                <Animated.Image
                  resizeMode="cover"
                  source={{
                    uri: 'https://images-na.ssl-images-amazon.com/images/I/A1LVEJikmZL._AC_SX425_.jpg',
                  }}
                  style={[styles.image, animateScale(scrollY)]}
                />
                {/* </Animated.View> */}

                <LinearGradient
                  style={styles.linearGradient2}
                  colors={[
                    'rgba(7, 7, 7, 0.00)',
                    'rgba(7, 7, 7, 0.34)',
                    'rgba(7, 7, 7, 0.55)',
                    COLORS.black,
                    COLORS.black,
                    COLORS.black,
                  ]}
                />
                <TextTitle
                  containerStyle={styles.textTitle}
                  label={'Tagalog'}
                />
                <View style={styles.infoContainer}>
                  <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
                    Sample
                  </Text>
                  <>
                    <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
                      {/* {releaseDate.substring(0, 4)} */}
                      January 20, 2002
                    </Text>
                  </>
                  <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
                    songs
                  </Text>
                  <>
                    <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
                      100 followers
                    </Text>
                  </>
                </View>
              </Animated.View>
            );
          }}
          ListFooterComponent={<View style={{marginBottom: 250}} />}
          data={music}
          renderItem={({item, index}: any) => {
            return (
              <TouchableOpacity
                onPress={() => onMediaItemHandler({item, index})}>
                <View style={styles.trackItemContainer}>
                  <Image
                    style={styles.albumImage}
                    source={{uri: item.artwork}}
                  />
                  <Text style={{color: 'white'}}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 40,
    width: '100%',
    backgroundColor: COLORS.lightGray3,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  linearGradient: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
  backIcon: {
    width: 25,
    height: 25,
    tintColor: COLORS.white,
    marginRight: 15,
    marginLeft: 15,
  },
  headerBack: {
    width: 25,
    height: 25,
    tintColor: COLORS.white,
    marginRight: 15,
    marginLeft: 15,
  },
  containerView: {
    alignItems: 'center',
    height: 400,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  albumImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 20,
  },
  linearGradient2: {
    position: 'absolute',
    height: 280,
    width: '100%',
    bottom: 0,
  },
  textTitle: {
    textAlign: 'center',
    position: 'relative',
    bottom: 120,
  },
  infoContainer: {
    position: 'relative',
    bottom: 130,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: SIZES.padding,
    marginBottom: 10,
  },
});

export default memo(Podcast);
