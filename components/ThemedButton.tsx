import { Text, type TextProps, StyleSheet } from 'react-native';
import { Button, type ButtonProps } from '@rneui/themed';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  name?: 'default' | 'signInGoogle';
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  name,
  type = 'solid',
  onPress,
  children,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'button');

  return (
    <Button
      type={type}
      buttonStyle={[
        { backgroundColor },
        styles.default,
        name === 'signInGoogle' ? styles.signInGoogle : undefined,
        style,
      ]}
      onPress={onPress}
      {...rest}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  default: {
    height: 40,
    padding: 0,
    justifyContent: 'space-evenly',
    borderRadius: 4
  },
  signInGoogle: {
    borderWidth: 1,
    borderColor: Colors.dark.borderGrey,
    backgroundColor: Colors.dark.background
  }
});