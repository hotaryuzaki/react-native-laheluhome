import { type ComponentProps } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof MaterialCommunityIcons>['name']>) {
  return <MaterialCommunityIcons size={28} style={style} {...rest} />;
}
