import TrackPlayer from 'react-native-track-player';
import {Event} from 'react-native-track-player';
import * as trackPlayerActions from 'src/store/slices/trackPlayerSlice';

export default async function () {
  // TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  // TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  // TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
  // TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.destroy());
  TrackPlayer.addEventListener(
    Event.RemotePlay,
    async () => await TrackPlayer.play(),
  );

  TrackPlayer.addEventListener(
    Event.RemotePause,
    async () => await TrackPlayer.pause(),
  );

  TrackPlayer.addEventListener(
    Event.RemoteStop,
    async () => await TrackPlayer.reset(),
  );

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async () => {
    TrackPlayer.seekTo((await TrackPlayer.getPosition()) - 15);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async () => {
    TrackPlayer.seekTo((await TrackPlayer.getPosition()) + 15);
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(
    Event.RemotePrevious,
    async () => await TrackPlayer.skipToPrevious(),
  );

  TrackPlayer.addEventListener(Event.RemoteSeek, ({position}) => {
    TrackPlayer.seekTo(position);
  });

  // TrackPlayer.addEventListener(Event.RemoteDuck, async e => {
  //   if (e.paused) {
  //     TrackPlayer.pause();
  //   } else {
  //     TrackPlayer.play();
  //   }
  // });
}
