import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  State,
  Event,
  usePlaybackState,
} from 'react-native-track-player';

import {RootState} from '../index';
import {shuffle} from 'src/utils/helpers';

const initialState = {
  isTrackPlaying: false,
  isShuffle: false,
  repeat: {one: false, all: false},
  searchTerm: '',
  currentTrack: {
    url: '',
    title: '',
    artwork: '',
    artist: '',
    id: '',
  },
  currentTrackDuration: 0,
  tracks: [] as any,
};

export const initAsync = createAsyncThunk('trackPlayer/init', async () => {
  await TrackPlayer.setupPlayer({});
});

export const setCurrentTrackAsync = createAsyncThunk<
  any,
  void,
  {state: RootState}
>(
  'trackPlayer/setCurrentTrack',
  async (trackIndex: any, {dispatch, getState}) => {
    const trackPlayer = getState().trackPlayer;
    // const playerState = usePlaybackState();
    // console.log(playerState, 'STATE');
    // if (playerState === State.Stopped) {
    //   return dispatch(seekToPositionAsync(0));
    // }
    let nextTrack = trackPlayer.tracks[trackIndex];
    console.log(trackIndex, nextTrack);
    setTimeout(() => {
      dispatch(getDurationTrackAsync());
    }, 100);
    return nextTrack;
  },
);

export const setTrackskAsync = createAsyncThunk(
  'trackPlayer/setTrackskAsync',
  async (tracks: typeof initialState.tracks) => {
    await TrackPlayer.add(tracks);
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
      alwaysPauseOnInterruption: true,
      stoppingAppPausesPlayback: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
        Capability.Skip,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
        Capability.Skip,
      ],
      // notificationCapabilities: [
      //   Capability.Play,
      //   Capability.Pause,
      //   Capability.SkipToNext,
      //   Capability.SkipToPrevious,
      // ],
    });
  },
);

export const playTrackAsync = createAsyncThunk(
  'trackPlayer/playTrack',
  async (_, {dispatch}) => {
    await TrackPlayer.play();
    setTimeout(() => {
      dispatch(getDurationTrackAsync());
    }, 1000);
  },
);

export const pauseTrackAsync = createAsyncThunk(
  'trackPlayer/pauseTrack',
  async () => {
    await TrackPlayer.pause();
  },
);

export const resetPlayerAsync = createAsyncThunk(
  'trackPlayer/resetPlayer',
  async () => {
    await TrackPlayer.reset();
  },
);

export const seekToPositionAsync = createAsyncThunk(
  'trackPlayer/seekToPosition',
  async (position: number) => {
    await TrackPlayer.seekTo(position);
  },
);

export const queueTrackAsync = createAsyncThunk(
  'trackPlayer/queueTrackAsync',
  async () => {
    await TrackPlayer.getQueue();
  },
);

export const getDurationTrackAsync = createAsyncThunk(
  'trackPlayer/getDurationTrackAsync',
  async () => {
    const duration = await TrackPlayer.getDuration();
    return duration;
  },
);

export const playNextTrackAsync = createAsyncThunk<
  any,
  void,
  {state: RootState}
>('trackPlayer/playNextTrack', async () => {
  await TrackPlayer.skipToNext();
});

export const playPrevTrackAsync = createAsyncThunk<
  any,
  void,
  {state: RootState}
>('trackPlayer/playPrevTrack', async () => {
  await TrackPlayer.skipToPrevious();
});

export const shuffleTracksAsync = createAsyncThunk<
  any,
  void,
  {state: RootState}
>('trackPlayer/shuffleTracks', async (_, {getState}) => {
  const trackPlayer = getState().trackPlayer;
  const currentTrack = trackPlayer.tracks.find(
    (track: any) => track.id === trackPlayer.currentTrack.id,
  );
  const filteredTracks = trackPlayer.tracks.filter(
    (track: any) => track.id !== currentTrack.id,
  );
  const randomTracks = shuffle(filteredTracks);
  randomTracks.unshift(currentTrack);
  return randomTracks;
});

export const unShuffleTracksAsync = createAsyncThunk<
  any,
  void,
  {state: RootState}
>('trackPlayer/unShuffleTracks', (_, {getState}) => {
  const originalTracks = getState().media.tracks.items;
  return originalTracks;
});

const trackPlayerSlice = createSlice({
  name: 'trackPlayer',
  initialState,
  reducers: {
    setSearchTerm: (state, {payload}) => {
      state.searchTerm = payload;
    },
    setTracks: (state, {payload}) => {
      state.tracks = payload;
    },
    repeatOne: state => {
      state.repeat = {one: true, all: false};
    },
    repeatAll: state => {
      state.repeat = {one: false, all: true};
    },
    unsetRepeat: state => {
      state.repeat = {one: false, all: false};
    },
    queueTrack: state => {
      state.repeat = {one: false, all: false};
    },
  },
  extraReducers: builder => {
    builder.addCase(initAsync.fulfilled, () => {});
    builder.addCase(setCurrentTrackAsync.fulfilled, (state, {payload}) => {
      state.currentTrack = payload;
    });
    builder.addCase(playTrackAsync.fulfilled, state => {
      state.isTrackPlaying = true;
    });
    builder.addCase(pauseTrackAsync.fulfilled, state => {
      state.isTrackPlaying = false;
    });
    builder.addCase(resetPlayerAsync.fulfilled, state => {
      state.currentTrack = {
        url: '',
        title: '',
        artwork: '',
        artist: '',
        id: '',
      };
    });
    builder.addCase(seekToPositionAsync.fulfilled, state => {});
    builder.addCase(shuffleTracksAsync.fulfilled, (state, {payload}) => {
      state.tracks = payload;
      state.isShuffle = true;
    });
    builder.addCase(unShuffleTracksAsync.fulfilled, (state, {payload}) => {
      state.tracks = payload;
      state.isShuffle = false;
    });
    builder.addCase(getDurationTrackAsync.fulfilled, (state, {payload}) => {
      state.currentTrackDuration = payload;
    });
  },
});

export const {
  setSearchTerm,
  setTracks,
  repeatOne,
  repeatAll,
  unsetRepeat,
  queueTrack,
} = trackPlayerSlice.actions;

export default trackPlayerSlice.reducer;
