import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

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

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  menuDrawerActive: {
    lineHeight: 30,
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuDrawer: {
    lineHeight: 30,
    fontSize: 18,
    fontWeight: '400',
  },
  tab: {
    fontSize: 16,
    paddingHorizontal: 5,
    textAlign: 'center'
  },

  postUsername: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 14,
    color: Colors.dark.textTertiary,
    paddingHorizontal: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postTag: {
    fontSize: 16,
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
  postCounter: {
    fontSize: 16,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 21,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 13,
    textAlign: 'center',
    color: Colors.dark.textTertiary,
  },
  signInGoogle: {
    fontSize: 13,
    textAlign: 'center',
    color: Colors.dark.textTertiary,
  },
  logIn: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuBottomSheetTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  menuBottomSheet: {
    fontSize: 18,
    paddingLeft: 10
  },
  menuBottomSheetRed: {
    fontSize: 20,
    color: Colors.dark.textReport,
    paddingLeft: 10,
  },
  nsfwTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 50,
  },
  nsfwText: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  nsfwLink: {
    fontSize: 16,
    color: Colors.dark.tint,
    textAlign: 'center',
    lineHeight: 50,
  },
});
