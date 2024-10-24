import { View, type ViewProps } from 'react-native';
import { usePathname } from 'expo-router';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  name?: string,
  tab?: string,
  tabSelected?: string,
  type?: string,
  lightColor?: string;
  darkColor?: string;
};

export function ListView({ name, tab, tabSelected, type, style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const pathname = usePathname();
  const drawerMenuBgSelected = useThemeColor({ light: lightColor, dark: darkColor }, 'drawerMenuBgSelected');
  const backgroundColor = (): string => {
    // FOR MENU TAB (HOME, FRESH, TRENDING)
    if (tab) {
      if (pathname != '/') { // CURRENT SCREEN IS NOT HOME SCREEN
        return pathname === name ? drawerMenuBgSelected : 'transparent';
      }
      else { // CURRENT SCREEN IS HOME SCREEN
        if (tab === tabSelected) return drawerMenuBgSelected; // HOME MENU TAB SELECTED
        else return 'transparent'; // HOME MENU TAB NOT SELECTED
      }
    }
    // FOR OTHER MENU
    else {
      return pathname === name ? drawerMenuBgSelected : 'transparent';
    }
  };

  return (
    <View
      style={[
        type === 'single' ? { height: 40 } : undefined,
        {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: backgroundColor(),
          paddingHorizontal: 20,
          paddingVertical: 5
        }, style]
      }
      {...otherProps}
    />
  );
}
