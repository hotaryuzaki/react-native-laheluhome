import { Fragment, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Video, type VideoNativeProps, type VideoRef } from "react-native-video";
import { Slider } from '@rneui/themed';
import InViewPort from 'react-native-inviewport';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { Functions } from '@/constants/Functions';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const width = Dimensions.get('window').width; // SCREEN WIDTH SIZE

export function VideoPlayer({ id, source, autoplay = false }: VideoNativeProps & { id: string, source: string; autoplay?: boolean }) {
  const videoRef = useRef<VideoRef | null>(null); // PAGERVIEW REF
  const [pausedManual, setPausedManual] = useState<boolean | undefined>(undefined); // PAUSEDMANUAL IS HIGH PRIORITY STATE
  const [paused, setPaused] = useState<boolean>(!autoplay); // PAUSED IS THE TRIGGERED PLAYBACK 
  const [muted, setMuted] = useState<boolean>(false);
  const [durationVisible, setDurationVisible] = useState<'flex' | 'none'>('none');
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const color = useThemeColor({}, 'text');

  // useEffect(() => {
  //   console.log('useEffect duration', id, duration);
  // }, [duration]);

  const onPlayPausePress = () => { setPausedManual((prev) => !prev); };

  // USEEFFECT FOR LOADING MORE PAGINATION WHEN ONENDREACHED & REFRESH PAGE
  useEffect(() => {
    console.log('pausedManual', pausedManual);
    if (pausedManual != undefined) setPaused(pausedManual); // PAUSEDMANUAL HAS TO BE TRIGGERED BY USER
  }, [pausedManual]);

  const onProgress = (data: { currentTime: number }) => {
    setCurrentTime(data.currentTime);
  };

  const onSliderValueChange = (value: number) => {
    videoRef.current?.seek(value);
    setCurrentTime(value);
  };

  const onSlidingStarted = () => {
    setDurationVisible('flex');
  };

  const onSlidingCompleted = () => {
    setDurationVisible('none');
  };

  const onMutePress = (toggle?: boolean) => {
    if (toggle != undefined) setMuted(toggle);
    else setMuted((prev) => !prev);
  };

  const inViewPort = (isVisible: boolean) => {
    // RUN THIS IF PAUSEDMANUAL HAS NOT TRIGGERED BY USER
    if (pausedManual == undefined) {
      // VIDEO INVIEWPORT & BEING PAUSE => VIDEO WILL PLAY
      if (isVisible && paused) {
        setPaused(false);
      }
      // VIDEO NOT INVIEWPORT & BEING PLAY => VIDEO WILL PAUSE
      else if (!isVisible && !paused) {
        setPaused(true);
      }
    }
    // PAUSEDMANUAL HAS TRIGGERED BY USER & VIDEO NOT INVIEWPORT
    else if (pausedManual != undefined && !isVisible) {
      setPaused(true);
      setPausedManual(undefined); // RETURN PAUSEDMANUAL TO UNDEFINED WHEN NOT INVIEWPORT
    }
  };


  return (
    <InViewPort
      key={id}
      style={styles.postMediaContainer}
      onChange={(isVisible: boolean) => inViewPort(isVisible)}
      delay={100}
      viewScreen={40}
    >
      <ThemedView style={styles.postMediaContainer}>
        <Video
          ref={videoRef}
          source={{ uri: source }}
          resizeMode="contain"
          style={styles.postMedia}
          paused={paused}
          onProgress={onProgress}
          onLoad={(data) => setDuration(data.duration)}
          repeat={true}
          muted={muted}
        />

        <TouchableOpacity
          onPress={() => onPlayPausePress()}
          style={styles.buttonPlayContainer}
        >
          {
            paused && (
              <Fragment>
                <View style={styles.buttonPlayCircle}></View>
                <MaterialCommunityIcons name="play" size={32} color={color} />
              </Fragment>
            )
          }
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onMutePress()}
          style={styles.buttonMuteContainer}
        >
          <View style={styles.buttonMuteCircle}></View>
          {
            muted
              ? <Ionicons name="volume-mute-outline" size={20} color={color} />
              : <Ionicons name="volume-high-outline" size={20} color={color} />
          }
        </TouchableOpacity>

        <View style={[styles.durationContainer, { display: durationVisible }]}>
          <ThemedText type='title'>
            {Functions.secToMin(currentTime)} / {Functions.secToMin(duration)}
          </ThemedText>
        </View>

        <Slider
          style={[styles.slider, durationVisible == 'flex' ? { height: 14 } : { height: 4 }]}
          trackStyle={[styles.trackStyle, durationVisible == 'flex' ? { height: 14 } : { height: 4 }]}
          value={currentTime}
          maximumValue={duration}
          minimumValue={0}
          step={0}
          allowTouchTrack
          onValueChange={onSliderValueChange}
          onSlidingStart={onSlidingStarted}
          onSlidingComplete={onSlidingCompleted}
          minimumTrackTintColor={Colors.dark.mediaTimeIndicatorProgress}
          maximumTrackTintColor={Colors.dark.mediaTimeIndicatorBackground}
          thumbStyle={[styles.thumbStyle, { backgroundColor: 'transparent' }]}
        />
      </ThemedView>
    </InViewPort>
  );
}

const styles = StyleSheet.create({
  postMediaContainer: {
    width: width,
    aspectRatio: 1,
    backgroundColor: Colors.dark.mediaBackground,
  },
  postMedia: {
    flex: 1,
  },
  buttonPlayContainer: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPlayCircle: {
    position: 'absolute',
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    opacity: 0.8,
    backgroundColor: Colors.dark.background,
  },
  buttonMuteContainer: {
    position: 'absolute',
    width: 30,
    aspectRatio: 1,
    bottom: 16,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  buttonMuteCircle: {
    position: 'absolute',
    width: 30,
    aspectRatio: 1,
    borderRadius: 50,
    opacity: 0.5,
    backgroundColor: Colors.dark.background,
  },
  durationContainer: {
    display: 'none',
    position: 'absolute',
    flex: 1,
    bottom: 28,
    alignSelf: 'center',
  },
  slider: {
    position: 'absolute',
    width: '100%',
    height: 4,
    bottom: 0,
  },
  trackStyle: {
    height: 4,
    borderRadius: 0,
  },
  thumbStyle: {
    width: 16,
    height: 16,
    backgroundColor: Colors.dark.mediaTimeIndicatorProgress
  },
});