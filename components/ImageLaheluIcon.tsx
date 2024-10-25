import { Image, type ImageProps } from 'expo-image';
import { ThemedView } from '@/components/ThemedView';
import styles from './style';

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
