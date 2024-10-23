import { StyleSheet } from 'react-native';
import { Image, type ImageProps } from 'expo-image';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';

export function ImagePost({ source }: ImageProps) {
  return (
    <ThemedView style={styles.postMediaContainer}>
      <Image
        style={styles.postMedia}
        source={source}
        transition={300}
        contentFit='contain'
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  postMediaContainer: {
    flex: 1,
    backgroundColor: Colors.dark.mediaBackground,
  },
  postMedia: {
    flex: 1,
    aspectRatio: 1,
  },
});