import { type ComponentProps } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import styles from './style';

export function InlineIcon({ size, style, ...rest }: IconProps<ComponentProps<typeof MaterialCommunityIcons>['name']>) {
  return <MaterialCommunityIcons size={size} style={[styles.inlineIcon, style]} {...rest} />;
}
