import { Dimensions, StyleSheet } from 'react-native';
import { Image, type ImageProps } from 'expo-image';
import Pinchable from 'react-native-pinchable';
import { Colors } from '@/constants/Colors';

const width = Dimensions.get('window').width; // SCREEN WIDTH SIZE

export function ImagePost({ source }: ImageProps) {
  return (
    <Pinchable style={styles.postMediaContainer}>
      <Image
        style={styles.postMedia}
        source={source}
        transition={300}
        contentFit='contain'
      />
    </Pinchable>
  );
}

const styles = StyleSheet.create({
  postMediaContainer: {
    flex: 1,
    backgroundColor: Colors.dark.mediaBackground,
  },
  postMedia: {
    width: width,
    height: width
  },
});