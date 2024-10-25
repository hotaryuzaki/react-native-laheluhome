import { Text, type TextProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import styles from './style';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' |
  'link' | 'menuDrawer' | 'menuDrawerActive' | 'tab' | 'postUsername' | 'postTime' |
  'postTitle' | 'postTag' | 'postCounter' | 'modalTitle' | 'menuBottomSheetTitle' | 'menuBottomSheet' | 'menuBottomSheetRed' |
  'modalText' | 'signInGoogle' | 'logIn' | 'nsfwTitle' | 'nsfwText' | 'nsfwLink';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'menuDrawerActive' ? styles.menuDrawerActive : undefined,
        type === 'menuDrawer' ? styles.menuDrawer : undefined,
        type === 'tab' ? styles.tab : undefined,
        type === 'postUsername' ? styles.postUsername : undefined,
        type === 'postTime' ? styles.postTime : undefined,
        type === 'postTitle' ? styles.postTitle : undefined,
        type === 'postTag' ? styles.postTag : undefined,
        type === 'postCounter' ? styles.postCounter : undefined,
        type === 'modalTitle' ? styles.modalTitle : undefined,
        type === 'modalText' ? styles.modalText : undefined,
        type === 'signInGoogle' ? styles.signInGoogle : undefined,
        type === 'logIn' ? styles.logIn : undefined,
        type === 'menuBottomSheetTitle' ? styles.menuBottomSheetTitle : undefined,
        type === 'menuBottomSheet' ? styles.menuBottomSheet : undefined,
        type === 'menuBottomSheetRed' ? styles.menuBottomSheetRed : undefined,
        type === 'nsfwTitle' ? styles.nsfwTitle : undefined,
        type === 'nsfwText' ? styles.nsfwText : undefined,
        type === 'nsfwLink' ? styles.nsfwLink : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
