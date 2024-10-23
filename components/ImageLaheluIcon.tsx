import { StyleSheet } from 'react-native';
import { Image, type ImageProps } from 'expo-image';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';

export function ImageLaheluIcon({ source }: ImageProps) {
  return (
    <ThemedView style={styles.circleContainer}>
      <Image
        style={styles.laheluIcon}
        source={source}
        contentFit='contain'
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: Colors.dark.background,
  },
  laheluIcon: {
    flex: 1,
    aspectRatio: 1,
  },
});