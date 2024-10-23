import { StyleSheet } from 'react-native';
import { Image, type ImageProps } from 'expo-image';
import { Constants } from '@/constants/Constants';

export function ImageAvatar({ source }: ImageProps) {
  return (
    <Image
      style={styles.postHeaderAvatar}
      source={source ? source : `${Constants.webUrl}/media/default/fresh-pp.jpg`}
      transition={300}
      contentFit='contain'
    />
  );
}

const styles = StyleSheet.create({
  postHeaderAvatar: {
    width: 30,
    aspectRatio: 1,
    borderRadius: 50,
  },
});