import { Image, type ImageProps } from 'expo-image';
import { Constants } from '@/constants/Constants';
import styles from './style';

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
