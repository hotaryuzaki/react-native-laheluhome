import { Image, type ImageProps } from 'expo-image';
import { Constants } from '@/constants/Constants';
import styles from './style';

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
