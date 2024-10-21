// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function InlineIcon({ size, style, ...rest }: IconProps<ComponentProps<typeof MaterialCommunityIcons>['name']>) {
  return <MaterialCommunityIcons size={size} style={[{ padding: 0, margin: 0 }, style]} {...rest} />;
}
