import { View, type ViewProps } from 'react-native';
import { usePathname } from 'expo-router';


import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  name?: string,
  lightColor?: string;
  darkColor?: string;
};

export function ListView({ name, style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const pathname = usePathname();
  const drawerMenuBgSelected = useThemeColor({ light: lightColor, dark: darkColor }, 'drawerMenuBgSelected');

  return (
    <View
      style={
        [{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: pathname === name ? drawerMenuBgSelected : 'transparent',
          paddingHorizontal: 20,
          paddingVertical: 5
        }, style]
      }
      {...otherProps}
    />
  );
}
