import { Fragment, useEffect, useRef, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
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

import styles from './style';

export type VideoPlayerProps = VideoNativeProps & {
  id: string,
  source: string;
  thumbnail?: string;
  autoplay?: boolean
};


export function VideoPlayer({ id, source, thumbnail, autoplay = false }: VideoPlayerProps) {
  const videoRef = useRef<VideoRef | null>(null); // PAGERVIEW REF
  const [pausedManual, setPausedManual] = useState<boolean | undefined>(undefined); // PAUSEDMANUAL IS HIGH PRIORITY STATE
  const [paused, setPaused] = useState<boolean>(!autoplay); // PAUSED IS THE TRIGGERED PLAYBACK 
  const [muted, setMuted] = useState<boolean>(false);
  const [durationVisible, setDurationVisible] = useState<'flex' | 'none'>('none');
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const color = useThemeColor({}, 'text');

  // USEEFFECT FOR LOADING MORE PAGINATION WHEN ONENDREACHED & REFRESH PAGE
  useEffect(() => {
    if (pausedManual != undefined) setPaused(pausedManual); // PAUSEDMANUAL HAS TO BE TRIGGERED BY USER
  }, [pausedManual]);

  const onPlayPausePress = () => { setPausedManual((prev) => !prev); };

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
      style={styles.postVideoContainer}
      onChange={(isVisible: boolean) => inViewPort(isVisible)}
      delay={100}
      viewScreen={40}
    >
      <ThemedView key={id} style={styles.postVideoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: source }}
          resizeMode="contain"
          style={styles.postVideo}
          paused={paused}
          onProgress={onProgress}
          onLoad={(data) => setDuration(data.duration)}
          repeat={true}
          muted={muted}
        // poster={{
        //   source: { uri: thumbnail },
        //   resizeMode: "contain",
        // }}
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
