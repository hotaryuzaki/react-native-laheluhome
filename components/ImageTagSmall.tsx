import { StyleSheet } from 'react-native';
import { Image, type ImageProps } from 'expo-image';
import { Constants } from '@/constants/Constants';

export function ImageTagSmall({ source }: ImageProps) {
  return (
    <Image
      style={styles.imageTagSmall}
      source={source ? source : `${Constants.webUrl}/media/default/fresh-pp.jpg`}
      transition={300}
      contentFit='contain'
    />
  );
}

const styles = StyleSheet.create({
  imageTagSmall: {
    width: 24,
    aspectRatio: 1,
    borderRadius: 4,
  },
});