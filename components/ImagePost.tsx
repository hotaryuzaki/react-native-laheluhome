import { Image, type ImageProps } from 'expo-image';
import Pinchable from 'react-native-pinchable';
import styles from './style';

export function ImagePost({ source }: ImageProps) {
  return (
    <Pinchable style={styles.postImageContainer}>
      <Image
        style={styles.postImage}
        source={source}
        transition={300}
        contentFit='contain'
      />
    </Pinchable>
  );
}
