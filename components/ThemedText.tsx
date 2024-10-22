import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'menuDrawer' | 'tab' | 'postUsername' | 'postTime' | 'postTitle' | 'postTag' | 'postCounter';
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
        type === 'menuDrawer' ? styles.menuDrawer : undefined,
        type === 'tab' ? styles.tab : undefined,
        type === 'postUsername' ? styles.postUsername : undefined,
        type === 'postTime' ? styles.postTime : undefined,
        type === 'postTitle' ? styles.postTitle : undefined,
        type === 'postTag' ? styles.postTag : undefined,
        type === 'postCounter' ? styles.postCounter : undefined,
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
    fontSize: 32,
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
  menuDrawer: {
    lineHeight: 30,
    fontSize: 18,
    fontWeight: '400',
    paddingHorizontal: 5
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
});
